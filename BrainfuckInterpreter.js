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
        this.isForked = false;
        this.children = [];
        this.forkCount = 0; // Nombre de forks créés par ce thread
        this.maxForksPerThread = 2; // Limite de forks par thread
        
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
        // Pour les threads enfants, on doit trouver le parent via le gestionnaire temporaire
        // Cette méthode est appelée seulement à la construction, donc on utilise le gestionnaire global temporaire
        if (typeof BrainfuckInterpreter.tempThreadManager !== 'undefined' && BrainfuckInterpreter.tempThreadManager) {
            return BrainfuckInterpreter.tempThreadManager.get(this.parentId) || null;
        }
        return null;
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
                this.output += String.fromCharCode(this.memory[this.ptr]);
                break;

            case ',':
                // Lit le caractère et utilise 0 si l'entrée est vide
                const char = this.input.shift();
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
                break;

            default:
                break;
        }

        this.ip++; 
        return true;
    }

    /**
     * Gère la commande de fork 'f'
     * Thread parent: cellule active = 0
     * Thread enfant: ptr++, cellule active = 1
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
        console.log(`🔍 Thread T${this.threadId} tente un fork (forks actuels: ${this.forkCount}/${this.maxForksPerThread})`);
        
        if (this.forkCount >= this.maxForksPerThread) {
            console.warn(`⚠️ Thread T${this.threadId} a atteint sa limite de forks (${this.forkCount}/${this.maxForksPerThread}) - Fork ignoré`);
            // Pas d'erreur, on ignore simplement le fork
            return;
        }
        
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
            return `T${id}(${thread.halted ? 'HALTED' : 'ACTIVE'}, forks: ${thread.forkCount}/${thread.maxForksPerThread})`;
        }).join(', '));
        
        // Protection contre les fork bombs globales
        if (activeThreadCount >= manager.maxThreads) {
            console.error(`❌ Fork refusé: ${activeThreadCount}/${manager.maxThreads} threads`);
            throw new Error(`Limite de threads atteinte (${activeThreadCount}/${manager.maxThreads}). Fork refusé.`);
        }
        
        const childId = manager.nextId++;
        
        // Créer un gestionnaire temporaire pour permettre au thread enfant de trouver son parent
        BrainfuckInterpreter.tempThreadManager = new Map();
        BrainfuckInterpreter.tempThreadManager.set(this.threadId, this);
        
        // Créer le thread enfant avec le constructeur
        const childThread = new BrainfuckInterpreter(this.code, this.input.join(''), childId, this.threadId);
        
        // Nettoyer le gestionnaire temporaire
        delete BrainfuckInterpreter.tempThreadManager;
        
        // Copier l'état actuel du parent (sauf les propriétés qui doivent être différentes)
        childThread.memory = [...this.memory];
        childThread.ptr = this.ptr;
        childThread.ip = this.ip;
        childThread.output = this.output;
        
        // Partager le gestionnaire avec l'enfant et s'assurer qu'il est ajouté
        childThread.threadManager = this.threadManager;
        
        // Ajouter au gestionnaire (même si le constructeur n'a pas pu le faire)
        manager.threads.set(childId, childThread);
        
        // Appliquer les règles du fork
        // Thread parent: cellule active = 0
        this.memory[this.ptr] = 0;
        
        // Thread enfant: ptr++, cellule active = 1
        childThread.ptr++;
        if (childThread.ptr >= childThread.memory.length) {
            // Extension automatique de la mémoire si nécessaire
            childThread.memory = childThread.memory.concat(new Array(MEMORY_SIZE).fill(0));
        }
        childThread.memory[childThread.ptr] = 1;
        
        // Enregistrer la relation parent-enfant
        this.children.push(childId);
        childThread.isForked = true;
        
        // Incrémenter le compteur de forks du parent
        this.forkCount++;
        
        console.log(`🔀 Fork créé: Parent T${this.threadId} (forks: ${this.forkCount}/${this.maxForksPerThread}) → Enfant T${childId} | PTR: ${this.ptr} → ${childThread.ptr}`);
        console.log(`📊 Threads après fork: ${manager.threads.size} total`);
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

        // Compter les threads actifs
        let activeThreadsCount = 0;
        for (const [threadId, thread] of manager.threads) {
            if (!thread.halted) activeThreadsCount++;
        }

        while (activeThreadsCount > 0 && totalSteps < maxTotalSteps) {
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
                activeThreadsCount--;
            });
            
            if (!anyProgress) break;
        }

        if (totalSteps >= maxTotalSteps) {
            throw new Error(`Limite d'exécution globale atteinte (${maxTotalSteps} étapes) avec ${activeThreadsCount} threads actifs`);
        }

        return results.sort((a, b) => a.threadId - b.threadId);
    }

    /**
     * Méthode statique pour compatibilité
     */
    static runAllThreads() {
        console.warn('⚠️ Méthode statique runAllThreads dépréciée');
        return [];
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
     * Remet à zéro le gestionnaire de threads
     */
    static resetThreadManager() {
        console.log('🔄 Reset complet du gestionnaire de threads');
        BrainfuckInterpreter.threadManager = {
            threads: new Map(),
            nextId: 1,
            activeThreads: 0,
            maxThreads: 8
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
     * Obtient tous les threads actifs (méthode statique pour compatibilité)
     * @returns {Array} Liste des états de tous les threads
     */
    static getAllThreadStates() {
        console.warn('⚠️ Méthode statique getAllThreadStates dépréciée');
        return [];
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

    /**
     * Méthode statique pour compatibilité
     */
    static setMaxThreads(maxThreads) {
        console.warn('⚠️ Méthode statique setMaxThreads dépréciée');
    }

    /**
     * Nettoie les threads terminés du gestionnaire (version statique pour compatibilité)
     * @returns {number} Nombre de threads nettoyés
     */
    static cleanupHaltedThreads() {
        console.warn('⚠️ Méthode statique cleanupHaltedThreads dépréciée');
        return 0;
    }

    /**
     * Debug: Affiche l'état complet du gestionnaire de threads
     */
    static debugThreadManager() {
        const manager = BrainfuckInterpreter.threadManager;
        if (!manager) {
            console.log('❌ Aucun gestionnaire de threads');
            return;
        }

        console.log('🔍 État du gestionnaire de threads:');
        console.log(`  - Total threads: ${manager.threads.size}`);
        console.log(`  - ActiveThreads compteur: ${manager.activeThreads}`);
        console.log(`  - NextId: ${manager.nextId}`);
        console.log(`  - MaxThreads: ${manager.maxThreads}`);
        
        let realActive = 0;
        for (const [threadId, thread] of manager.threads) {
            const status = thread.halted ? 'HALTED' : 'ACTIVE';
            console.log(`  - Thread T${threadId}: ${status} (parent: T${thread.parentId || 'none'})`);
            if (!thread.halted) realActive++;
        }
        console.log(`  - Threads réellement actifs: ${realActive}`);
    }
}
