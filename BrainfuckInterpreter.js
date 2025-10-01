// Version 1.5.0 - Mise à jour automatique du 2025-10-01
const MEMORY_SIZE = 30000;
const MAX_BYTE_VALUE = 256;
const VALID_CHARS = '><+-.,[]f'; // Ajout de la commande 'f' pour le fork

/**
 * BrainfuckInterpreter avec support du multithreading
 *
 * Interprète le code Brainfuck en gérant la mémoire, le pointeur de cellule,
 * et le pointeur d'instruction. Il supporte l'exécution pas à pas et le
 * multithreading avec la commande 'f' (fork).
 */
class BrainfuckInterpreter {
    /**
     * @param {string} code Le programme Brainfuck à exécuter.
     * @param {string} [input=''] L'entrée utilisateur simulée pour la commande ','.
     * @param {number} [threadId=0] Identifiant unique du thread.
     * @param {number} [parentId=null] ID du thread parent (null pour le thread principal).
     */
    constructor(code, input = '', threadId = 0, parentId = null) {
        // Validation et nettoyage : S'assurer que 'code' est une chaîne et n'est pas null/undefined
        const safeCode = typeof code === 'string' ? code : '';
        this.originalCode = safeCode;
        this.codeMap = [];

        const filteredChars = [];
        for (let i = 0; i < safeCode.length; i++) {
            const char = safeCode[i];
            if (!VALID_CHARS.includes(char)) {
                continue;
            }
            filteredChars.push(char);
            this.codeMap.push(i);
        }
        this.code = filteredChars.join('');
        
        this.input = (typeof input === 'string' ? input : '').split('');
        this.memory = new Array(MEMORY_SIZE).fill(0);
        this.ptr = 0; 
        this.ip = 0; 
        this.output = ''; 
        this.loopMap = this.buildLoopMap(this.code);
        this.halted = false;

        // Informations de threading
        this.threadId = threadId;
        this.parentId = parentId;
        this.parentThread = null; // Référence directe au thread parent (sera définie lors de la création)
        this.isForked = false;
        this.children = [];
        this.forkCount = 0; // Nombre de forks créés par ce thread (pour statistiques)
        
        // Gestionnaire de threads par instance (non statique)
        if (threadId === 0) {
            // Thread principal - créer un nouveau gestionnaire
            this.threadManager = {
                threads: new Map(),
                nextId: 1,
                maxThreads: 8 // Protection contre les fork bombs
            };
            this.threadManager.threads.set(this.threadId, this);
        } else {
            // Thread enfant - récupérer le gestionnaire du parent
            const parentThread = this.getParentThread();
            this.threadManager = parentThread ? parentThread.threadManager : null;
            if (this.threadManager) {
                this.threadManager.threads.set(this.threadId, this);
            }
        }
        
        // Debug lors de la création d'un thread
        console.log(`🧵 Création Thread T${this.threadId} (parent: T${this.parentId || 'none'})`); 
    }

    /**
     * Récupère le thread parent depuis le gestionnaire d'instance
     * @returns {BrainfuckInterpreter|null} Le thread parent ou null
     */
    getParentThread() {
        if (!this.parentId) {
            return null;
        }
        // Pour les threads enfants, utiliser la référence directe stockée
        return this.parentThread || null;
    }

    /**
     * Prépare une carte (Map) pour lier les crochets d'ouverture '[' à
     * leurs crochets de fermeture ']' correspondants, et vice-versa.
     * @param {string} code Le programme Brainfuck nettoyé.
     * @returns {Map<number, number>} La carte des sauts de boucles.
     * @throws {Error} Si la syntaxe des crochets est incorrecte.
     */
    buildLoopMap(code) {
        const map = new Map();
        const stack = [];
        for (let i = 0; i < code.length; i++) {
            if (code[i] === '[') {
                stack.push(i);
            } else if (code[i] === ']') {
                const open = stack.pop();
                if (open === undefined) {
                    throw new Error(`']' sans '[' à l'index ${i}.`);
                }
                map.set(open, i);
                map.set(i, open);
            }
        }
        if (stack.length > 0) {
            throw new Error(`'[' sans ']' (reste ${stack.length} non fermés).`);
        }
        return map;
    }

    /**
     * Exécute une seule instruction Brainfuck.
     * @returns {boolean} Vrai si l'exécution s'est poursuivie, Faux si le programme est terminé.
     */
    step() {
        console.log(`📍 Thread T${this.threadId} step: IP=${this.ip}/${this.code.length}, instruction='${this.code[this.ip] || 'EOF'}'`);
        
        if (this.ip >= this.code.length) {
            console.log(`🛑 Thread T${this.threadId} terminé (IP: ${this.ip}/${this.code.length})`);
            this.halted = true;
            return false;
        }

        const instruction = this.code[this.ip];

        switch (instruction) {
            case '>':
                this.ptr++;
                if (this.ptr >= this.memory.length) {
                    // Le pointeur est hors limites. On pourrait aussi redimensionner la mémoire ou boucler.
                    console.warn(`Pointeur de mémoire hors des limites (> ${MEMORY_SIZE - 1}).`);
                }
                break;

            case '<':
                if (this.ptr > 0) {
                    this.ptr--;
                }
                break;

            case '+':
                // Débordement (wraparound) de 255 à 0
                this.memory[this.ptr] = (this.memory[this.ptr] + 1) % MAX_BYTE_VALUE;
                break;

            case '-':
                // Sous-débordement (wraparound) de 0 à 255
                this.memory[this.ptr] = (this.memory[this.ptr] - 1 + MAX_BYTE_VALUE) % MAX_BYTE_VALUE;
                break;

            case '.':
                const outputChar = String.fromCharCode(this.memory[this.ptr]);
                console.log(`🔍 DEBUG: Before output update - this.output.length=${this.output.length}, adding char code: ${this.memory[this.ptr]}`);
                this.output += outputChar;
                console.log(`🔍 DEBUG: After output update - this.output.length=${this.output.length}, charCodeAt(0)=${this.output.length > 0 ? this.output.charCodeAt(this.output.length-1) : 'N/A'}`);
                // Notifier le callback d'output si défini
                if (typeof window !== 'undefined' && window.onThreadOutput) {
                    console.log(`🔍 DEBUG: Calling callback with threadId=${this.threadId}, output.length=${this.output.length}`);
                    window.onThreadOutput(this.threadId, this.output);
                }
                break;

            case ',':
                // Lit le caractère et utilise 0 si l'entrée est vide
                // S'assurer que this.input est un tableau
                if (!Array.isArray(this.input)) {
                    console.warn(`⚠️ Thread T${this.threadId}: this.input n'est pas un tableau:`, typeof this.input, this.input);
                    this.input = (typeof this.input === 'string' ? this.input : '').split('');
                    console.log(`🔧 Thread T${this.threadId}: this.input converti en tableau:`, this.input);
                }
                const char = this.input.shift();
                console.log(`📥 Thread T${this.threadId}: Lecture caractère "${char}" (input restant:`, this.input, `)`);
                this.memory[this.ptr] = char !== undefined ? char.charCodeAt(0) : 0;
                break;

            case '[':
                // Sauter après le ']' correspondant si la valeur est zéro
                if (this.memory[this.ptr] === 0) {
                    this.ip = this.loopMap.get(this.ip);
                }
                break;

            case ']':
                // Sauter après le '[' correspondant si la valeur n'est PAS zéro
                if (this.memory[this.ptr] !== 0) {
                    this.ip = this.loopMap.get(this.ip);
                }
                break;

            case 'f':
                this.handleFork();
                // Pas d'incrémentation automatique - handleFork() gère l'IP
                return true;

            default:
                break;
        }

        this.ip++; 
        return true;
    }

    /**
     * Exécute une seule étape pour ce thread spécifique
     * @returns {boolean} true si le thread peut continuer, false s'il est terminé
     */
    stepSingleThread() {
        if (this.halted) {
            return false;
        }
        
        return this.step();
    }

    /**
     * Vérifie s'il y a des threads multiples actifs
     * @returns {boolean} true s'il y a plus d'un thread actif
     */
    hasMultipleActiveThreads() {
        if (!this.threadManager) {
            return false;
        }
        
        let activeCount = 0;
        for (const [_, thread] of this.threadManager.threads) {
            if (!thread.halted) {
                activeCount++;
                if (activeCount > 1) return true; // Optimisation: sortir dès qu'on en trouve 2
            }
        }
        
        return false;
    }

    /**
     * Gère la commande fork 'f' - Style Unix
     * Crée un thread enfant avec copie de la mémoire
     * Thread parent: reçoit le PID de l'enfant dans la cellule courante
     * Thread enfant: reçoit 0 dans la cellule courante
     * Erreur: reçoit -1 (non implémenté dans cette version)
     */
    handleFork() {
        const manager = this.threadManager;
        if (!manager) {
            console.error('❌ Pas de gestionnaire de threads disponible');
            return;
        }
        
        // Nettoyer d'abord les threads terminés
        this.cleanupHaltedThreads();
        
        // Vérifier la limite de forks par thread
        console.log(`🔍 Thread T${this.threadId} tente un fork Unix-style (forks créés: ${this.forkCount})`);
        
        // Compter seulement les threads actifs (non halted)
        let activeThreadCount = 0;
        for (const [threadId, thread] of manager.threads) {
            if (!thread.halted) {
                activeThreadCount++;
            }
        }
        
        console.log(`🔍 Debug Fork: Threads actifs = ${activeThreadCount}, Limite = ${manager.maxThreads}`);
        console.log(`📋 Threads dans le manager:`, Array.from(manager.threads.keys()).map(id => {
            const thread = manager.threads.get(id);
            return `T${id}(${thread.halted ? 'HALTED' : 'ACTIVE'}, forks: ${thread.forkCount})`;
        }).join(', '));
        
        // Protection contre les fork bombs - Limite globale de threads
        if (activeThreadCount >= manager.maxThreads) {
            console.error(`❌ Fork refusé: ${activeThreadCount}/${manager.maxThreads} threads`);
            throw new Error(`🛡️ Protection fork bomb: Limite globale de threads atteinte (${activeThreadCount}/${manager.maxThreads}). Fork refusé. Augmentez la limite ou simplifiez le programme.`);
        }
        
        const childId = manager.nextId++;
        
        // Créer le thread enfant avec le constructeur
        // S'assurer que l'input est une chaîne pour le constructeur
        const inputString = Array.isArray(this.input) ? this.input.join('') : (typeof this.input === 'string' ? this.input : '');
        const childThread = new BrainfuckInterpreter(this.code, inputString, childId, this.threadId);
        
        // Établir la référence directe parent-enfant
        childThread.parentThread = this;
        
        // Copier l'état actuel du parent (sauf les propriétés qui doivent être différentes)
        childThread.memory = [...this.memory];
        childThread.ptr = this.ptr;
        childThread.ip = this.ip;
        childThread.output = this.output;
        
        // Partager le gestionnaire avec l'enfant et s'assurer qu'il est ajouté
        childThread.threadManager = this.threadManager;
        
        // Ajouter au gestionnaire (même si le constructeur n'a pas pu le faire)
        manager.threads.set(childId, childThread);
        
        // Appliquer les règles du fork Unix-style
        // Thread parent: reçoit le PID de l'enfant (childId) dans la cellule courante
        this.memory[this.ptr] = childId;
        
        // Thread enfant: reçoit 0 dans la cellule courante (indique qu'il est l'enfant)
        childThread.memory[childThread.ptr] = 0;
        
        // Enregistrer la relation parent-enfant
        this.children.push(childId);
        childThread.isForked = true;
        
        // Incrémenter le compteur de forks du parent
        this.forkCount++;
        
        // IMPORTANT: Avancer l'IP pour éviter la re-exécution de 'f'
        // Les deux threads continuent après le fork
        const nextIP = this.ip + 1;
        this.ip = nextIP;
        childThread.ip = nextIP;
        
        console.log(`🔀 Fork Unix-style: Parent T${this.threadId} reçoit PID=${childId}, Enfant T${childId} reçoit 0`);
        console.log(`📊 Threads après fork: ${manager.threads.size} total (Parent: ${this.forkCount}/${this.maxForksPerThread} forks)`);
    }

    /**
     * Nettoie les threads terminés du gestionnaire d'instance
     * @returns {number} Nombre de threads nettoyés
     */
    cleanupHaltedThreads() {
        const manager = this.threadManager;
        if (!manager) return 0;

        let cleaned = 0;
        const threadsToRemove = [];

        for (const [threadId, thread] of manager.threads) {
            if (thread.halted) {
                threadsToRemove.push(threadId);
            }
        }

        threadsToRemove.forEach(threadId => {
            manager.threads.delete(threadId);
            cleaned++;
        });

        return cleaned;
    }

    /**
     * Exécute le programme jusqu'à la fin.
     */
    runAll() {
        const maxSteps = 100000; // Réduit pour la sécurité
        let steps = 0;

        while (this.step() && steps < maxSteps) {
            steps++;
        }

        if (steps >= maxSteps) {
            console.error("Limite d'étapes atteinte. Programme possiblement en boucle infinie.");
            this.halted = true;
        }

        return this.output;
    }

    /**
     * Exécute tous les threads jusqu'à completion
     * @returns {Array} Résultats de tous les threads
     */
    runAllThreads() {
        try {
            const manager = this.threadManager;
            if (!manager) {
                return [{
                    threadId: this.threadId,
                    parentId: this.parentId,
                    output: this.runAll(),
                    finalPtr: this.ptr,
                    finalMemory: this.memory.slice(0, 50),
                    children: this.children
                }];
            }
            
            const results = [];
            let totalSteps = 0;
            const maxTotalSteps = 500000; // Limite globale plus élevée
            let activeThreadsCount = 0; // Déclaration en dehors de la boucle

            while (totalSteps < maxTotalSteps) {
                // Recompter les threads actifs à chaque itération (pour gérer les nouveaux forks)
                activeThreadsCount = 0;
                for (const [threadId, thread] of manager.threads) {
                    if (!thread.halted) activeThreadsCount++;
                }
                
                if (activeThreadsCount === 0) break;
            
            let anyProgress = false;
            const threadsToRemove = [];
            
            // Exécuter une étape pour chaque thread actif
            for (const [threadId, thread] of manager.threads) {
                if (!thread.halted) {
                    const continued = thread.step();
                    if (continued) {
                        anyProgress = true;
                        totalSteps++;
                    } else {
                        // Thread terminé
                        thread.halted = true;
                        threadsToRemove.push(threadId);
                        results.push({
                            threadId: thread.threadId,
                            parentId: thread.parentId,
                            output: thread.output,
                            finalPtr: thread.ptr,
                            finalMemory: thread.memory.slice(0, 50),
                            children: thread.children
                        });
                        console.log(`🛑 Thread T${threadId} terminé.`);
                    }
                }
            }
            
            // Nettoyer les threads terminés du gestionnaire
            threadsToRemove.forEach(threadId => {
                manager.threads.delete(threadId);
            });
            
            if (!anyProgress) break;
        }

        if (totalSteps >= maxTotalSteps) {
            // Recalculer le nombre de threads actifs pour le message d'erreur
            let currentActiveCount = 0;
            for (const [threadId, thread] of manager.threads) {
                if (!thread.halted) currentActiveCount++;
            }
            throw new Error(`Limite d'exécution globale atteinte (${maxTotalSteps} étapes) avec ${currentActiveCount} threads actifs`);
        }

        // Forcer la capture des outputs avant de retourner les résultats
        if (typeof window !== 'undefined' && window.captureThreadOutputsForRunAll) {
            window.captureThreadOutputsForRunAll(results);
        }

        return results.sort((a, b) => a.threadId - b.threadId);
        } catch (error) {
            console.error('❌ Erreur dans runAllThreads:', error.message);
            console.error('❌ Stack trace:', error.stack);
            throw new Error(`Erreur d'exécution multi-thread: ${error.message}`);
        }
    }

    /**
     * Retourne l'état actuel de l'interpréteur pour l'affichage.
     */
    getState() {
        // Calculer le nombre réel de threads actifs
        const manager = this.threadManager;
        let realActiveThreads = 0;
        if (manager) {
            for (const [threadId, thread] of manager.threads) {
                if (!thread.halted) {
                    realActiveThreads++;
                }
            }
        } else {
            realActiveThreads = 1;
        }
        
        return {
            ptr: this.ptr,
            ip: this.ip,
            code: this.code,
            memoryFull: this.memory,
            output: this.output,
            halted: this.halted,
            originalCode: this.originalCode,
            codeMap: this.codeMap,
            
            // Informations de threading
            threadId: this.threadId,
            parentId: this.parentId,
            isForked: this.isForked,
            children: this.children,
            forkCount: this.forkCount,
            maxForksPerThread: this.maxForksPerThread,
            totalThreads: realActiveThreads,
            currentInstruction: this.code[this.ip] || null
        };
    }

    /**
     * Obtient tous les threads actifs depuis le gestionnaire d'instance
     * @returns {Array} Liste des états de tous les threads
     */
    getAllThreadStates() {
        const manager = this.threadManager;
        const states = [];
        
        if (manager) {
            for (const [threadId, thread] of manager.threads) {
                states.push(thread.getState());
            }
        }
        
        return states.sort((a, b) => a.threadId - b.threadId);
    }

    /**
     * Configure la limite maximale de threads
     * @param {number} maxThreads - Nouvelle limite
     */
    setMaxThreads(maxThreads) {
        if (this.threadManager) {
            this.threadManager.maxThreads = maxThreads;
        }
    }
}
