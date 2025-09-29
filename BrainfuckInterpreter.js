const MEMORY_SIZE = 30000;
const MAX_BYTE_VALUE = 256;
const VALID_CHARS = '><+-.,[]y'; // Ajout de la commande 'y' pour le fork

/**
 * BrainfuckInterpreter avec support du multithreading
 *
 * Interprète le code Brainfuck en gérant la mémoire, le pointeur de cellule,
 * et le pointeur d'instruction. Il supporte l'exécution pas à pas et le
 * multithreading avec la commande 'y' (fork).
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
        
        // Gestionnaire global de threads (statique)
        if (!BrainfuckInterpreter.threadManager) {
            BrainfuckInterpreter.threadManager = {
                threads: new Map(),
                nextId: 1,
                activeThreads: 0,
                maxThreads: 100 // Protection contre les fork bombs
            };
        }
        
        BrainfuckInterpreter.threadManager.threads.set(this.threadId, this);
        
        // Incrémenter activeThreads seulement pour le thread principal (threadId = 0)
        // Les threads enfants sont comptés dans handleFork()
        if (this.threadId === 0) {
            BrainfuckInterpreter.threadManager.activeThreads++;
        } 
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
        if (this.ip >= this.code.length) {
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

            case 'y':
                this.handleFork();
                break;

            default:
                break;
        }

        this.ip++; 
        return true;
    }

    /**
     * Gère la commande de fork 'y'
     * Thread parent: cellule active = 0
     * Thread enfant: ptr++, cellule active = 1
     */
    handleFork() {
        const manager = BrainfuckInterpreter.threadManager;
        
        // Compter seulement les threads actifs (non halted)
        let activeThreadCount = 0;
        for (const [threadId, thread] of manager.threads) {
            if (!thread.halted) {
                activeThreadCount++;
            }
        }
        
        // Protection contre les fork bombs
        if (activeThreadCount >= manager.maxThreads) {
            throw new Error(`Limite de threads atteinte (${activeThreadCount}/${manager.maxThreads}). Fork refusé.`);
        }
        
        const childId = manager.nextId++;
        
        // Créer le thread enfant avec copie complète de l'état
        const childThread = new BrainfuckInterpreter(
            this.originalCode, 
            this.input.join(''), 
            childId, 
            this.threadId
        );
        
        // Copier l'état complet du parent vers l'enfant
        childThread.memory = [...this.memory];
        childThread.ptr = this.ptr;
        childThread.ip = this.ip;
        childThread.input = [...this.input];
        childThread.output = this.output;
        childThread.code = this.code;
        childThread.codeMap = [...this.codeMap];
        childThread.loopMap = this.loopMap;
        childThread.halted = this.halted;
        
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
        
        // Incrémenter le compteur seulement maintenant
        manager.activeThreads++;
        
        console.log(`🔀 Fork créé: Parent T${this.threadId} → Enfant T${childId} | PTR: ${this.ptr} → ${childThread.ptr}`);
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
    static runAllThreads() {
        const manager = BrainfuckInterpreter.threadManager;
        const results = [];
        let totalSteps = 0;
        const maxTotalSteps = 500000; // Limite globale plus élevée

        while (manager.activeThreads > 0 && totalSteps < maxTotalSteps) {
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
                        console.log(`🛑 Thread T${threadId} terminé. Restants: ${manager.activeThreads - 1}`);
                    }
                }
            }
            
            // Nettoyer les threads terminés du gestionnaire
            threadsToRemove.forEach(threadId => {
                manager.threads.delete(threadId);
                manager.activeThreads--;
            });
            
            if (!anyProgress) break;
        }

        if (totalSteps >= maxTotalSteps) {
            throw new Error(`Limite d'exécution globale atteinte (${maxTotalSteps} étapes) avec ${manager.activeThreads} threads actifs`);
        }

        return results.sort((a, b) => a.threadId - b.threadId);
    }

    /**
     * Retourne l'état actuel de l'interpréteur pour l'affichage.
     */
    getState() {
        // Calculer le nombre réel de threads actifs
        const manager = BrainfuckInterpreter.threadManager;
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
            totalThreads: realActiveThreads,
            currentInstruction: this.code[this.ip] || null
        };
    }

    /**
     * Remet à zéro le gestionnaire de threads
     */
    static resetThreadManager() {
        BrainfuckInterpreter.threadManager = {
            threads: new Map(),
            nextId: 1,
            activeThreads: 0,
            maxThreads: 100
        };
    }

    /**
     * Obtient tous les threads actifs
     * @returns {Array} Liste des états de tous les threads
     */
    static getAllThreadStates() {
        const manager = BrainfuckInterpreter.threadManager;
        const states = [];
        
        for (const [threadId, thread] of manager.threads) {
            states.push(thread.getState());
        }
        
        return states.sort((a, b) => a.threadId - b.threadId);
    }

    /**
     * Configure la limite maximale de threads
     * @param {number} maxThreads - Nouvelle limite
     */
    static setMaxThreads(maxThreads) {
        if (BrainfuckInterpreter.threadManager) {
            BrainfuckInterpreter.threadManager.maxThreads = maxThreads;
        }
    }

    /**
     * Nettoie les threads terminés du gestionnaire
     * @returns {number} Nombre de threads nettoyés
     */
    static cleanupHaltedThreads() {
        const manager = BrainfuckInterpreter.threadManager;
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

        // Recalculer le compteur activeThreads
        let actualActiveThreads = 0;
        for (const [threadId, thread] of manager.threads) {
            if (!thread.halted) {
                actualActiveThreads++;
            }
        }
        manager.activeThreads = actualActiveThreads;

        return cleaned;
    }
}
