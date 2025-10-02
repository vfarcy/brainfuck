// Version 1.7.4 - Mise à jour automatique du 2025-10-02
// ForkBrain - Corrections appliquées : Fork Unix-style, Round-robin intelligent, Marquage threads terminés, BrainfuckStatsAnalyzer complet, Documentation fork examples corrigés, API Documentation complète
const MEMORY_SIZE = 30000;
const MAX_BYTE_VALUE = 256;
const VALID_CHARS = '><+-.,[]f'; // Ajout de la commande 'f' pour le fork

/**
 * BrainfuckInterpreter avec support du multithreading Unix-style
 *
 * Interprète le code Brainfuck en gérant la mémoire, le pointeur de cellule,
 * et le pointeur d'instruction. Il supporte l'exécution pas à pas et le
 * multithreading avec la commande 'f' (fork Unix-style).
 * 
 * Fonctionnalités :
 * - Fork Unix-style : Parent reçoit PID, enfant reçoit 0
 * - Gestion multi-thread intelligente avec round-robin
 * - Statistiques d'exécution complètes
 * - Protection contre les fork bombs
 * - Interface de debugging avancée
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
        
        // Statistiques d'exécution
        this.stats = {
            // Performance
            totalSteps: 0,
            executionStartTime: null,
            executionEndTime: null,
            
            // Instructions
            instructionCounts: { '>': 0, '<': 0, '+': 0, '-': 0, '.': 0, ',': 0, '[': 0, ']': 0, 'f': 0 },
            
            // Boucles
            loopIterations: 0,
            maxLoopDepth: 0,
            currentLoopDepth: 0,
            
            // Mémoire
            maxPtrReached: 0,
            minPtrReached: 0,
            memoryWrites: 0,
            memoryReads: 0,
            cellsUsed: new Set(),
            overflowCount: 0,
            underflowCount: 0,
            
            // Threading
            forksCreated: 0,
            maxConcurrentThreads: 1,
            
            // IO
            inputCharsRead: 0,
            outputCharsWritten: 0
        };
        
        // Gestionnaire de threads par instance (non statique)
        if (threadId === 0) {
            // Thread principal - créer un nouveau gestionnaire
            this.threadManager = {
                threads: new Map(),
                nextId: 1,
                maxThreads: 8 // Protection contre les fork bombs
            };
            this.threadManager.threads.set(this.threadId, this);
            // Démarrer le timer pour le thread principal
            this.stats.executionStartTime = performance.now();
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
     * Met à jour les statistiques d'utilisation mémoire
     */
    updateMemoryStats() {
        this.stats.cellsUsed.add(this.ptr);
        this.stats.maxPtrReached = Math.max(this.stats.maxPtrReached, this.ptr);
        this.stats.minPtrReached = Math.min(this.stats.minPtrReached, this.ptr);
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
            // Enregistrer le temps de fin pour le thread principal
            if (this.threadId === 0) {
                this.stats.executionEndTime = performance.now();
            }
            return false;
        }

        const instruction = this.code[this.ip];
        this.stats.totalSteps++;
        this.stats.instructionCounts[instruction]++;

        // Tracker l'utilisation mémoire
        this.updateMemoryStats();

        switch (instruction) {
            case '>':
                this.ptr++;
                if (this.ptr >= this.memory.length) {
                    console.warn(`Pointeur de mémoire hors des limites (> ${MEMORY_SIZE - 1}).`);
                }
                break;

            case '<':
                if (this.ptr > 0) {
                    this.ptr--;
                }
                break;

            case '+':
                const oldValue = this.memory[this.ptr];
                this.memory[this.ptr] = (this.memory[this.ptr] + 1) % MAX_BYTE_VALUE;
                this.stats.memoryWrites++;
                if (oldValue === 255) this.stats.overflowCount++;
                break;

            case '-':
                const oldVal = this.memory[this.ptr];
                this.memory[this.ptr] = (this.memory[this.ptr] - 1 + MAX_BYTE_VALUE) % MAX_BYTE_VALUE;
                this.stats.memoryWrites++;
                if (oldVal === 0) this.stats.underflowCount++;
                break;

            case '.':
                const outputChar = String.fromCharCode(this.memory[this.ptr]);
                console.log(`🔍 DEBUG: Before output update - this.output.length=${this.output.length}, adding char code: ${this.memory[this.ptr]}`);
                this.output += outputChar;
                this.stats.outputCharsWritten++;
                this.stats.memoryReads++;
                console.log(`🔍 DEBUG: After output update - this.output.length=${this.output.length}, charCodeAt(0)=${this.output.length > 0 ? this.output.charCodeAt(this.output.length-1) : 'N/A'}`);
                // Notifier le callback d'output si défini
                if (typeof window !== 'undefined' && window.onThreadOutput) {
                    console.log(`🔍 DEBUG: Calling callback with threadId=${this.threadId}, output.length=${this.output.length}`);
                    window.onThreadOutput(this.threadId, this.output);
                }
                break;

            case ',':
                // S'assurer que this.input est un tableau
                if (!Array.isArray(this.input)) {
                    console.warn(`⚠️ Thread T${this.threadId}: this.input n'est pas un tableau:`, typeof this.input, this.input);
                    this.input = (typeof this.input === 'string' ? this.input : '').split('');
                    console.log(`🔧 Thread T${this.threadId}: this.input converti en tableau:`, this.input);
                }
                const char = this.input.shift();
                console.log(`📥 Thread T${this.threadId}: Lecture caractère "${char}" (input restant:`, this.input, `)`);
                this.memory[this.ptr] = char !== undefined ? char.charCodeAt(0) : 0;
                this.stats.inputCharsRead++;
                this.stats.memoryWrites++;
                break;

            case '[':
                if (this.memory[this.ptr] === 0) {
                    this.ip = this.loopMap.get(this.ip);
                } else {
                    this.stats.currentLoopDepth++;
                    this.stats.maxLoopDepth = Math.max(this.stats.maxLoopDepth, this.stats.currentLoopDepth);
                }
                this.stats.memoryReads++;
                break;

            case ']':
                if (this.memory[this.ptr] !== 0) {
                    this.stats.loopIterations++;
                    this.ip = this.loopMap.get(this.ip);
                } else {
                    this.stats.currentLoopDepth = Math.max(0, this.stats.currentLoopDepth - 1);
                }
                this.stats.memoryReads++;
                break;

            case 'f':
                this.handleFork();
                // CORRECTION: Pas d'incrémentation car handleFork() gère l'IP
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
        
        const continued = this.step();
        
        // CORRECTION: Marquer le thread comme terminé si step() retourne false
        if (!continued) {
            this.halted = true;
        }
        
        return continued;
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
     * 
     * Implémentation conforme à la sémantique Unix fork() :
     * - Le fork remplace la valeur de la cellule courante
     * - Parent : reçoit l'ID du processus enfant (> 0)
     * - Enfant : reçoit 0
     * - Erreur : reçoit -1 (non implémenté dans cette version)
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
        
        // CORRECTION: Avancer l'IP AVANT de créer l'enfant pour éviter la re-exécution du fork
        this.ip++;
        
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
        childThread.ip = this.ip; // L'enfant commence à la même position que le parent (après 'f')
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
        
        console.log(`🔀 Fork Unix-style: Parent T${this.threadId} reçoit PID=${childId}, Enfant T${childId} reçoit 0`);
        console.log(`📊 Threads après fork: ${manager.threads.size} total (Parent: ${this.forkCount} forks)`);
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
            totalThreads: realActiveThreads,
            currentInstruction: this.code[this.ip] || null,
            
            // Nouvelles statistiques
            stats: this.stats,
            statsAnalysis: this.halted ? this.generateStatsAnalysis() : null
        };
    }

    /**
     * Génère une analyse des statistiques d'exécution
     * @returns {Object} Analyse des performances et recommandations
     */
    generateStatsAnalysis() {
        const executionTime = this.stats.executionEndTime ? 
            (this.stats.executionEndTime - this.stats.executionStartTime) : 0;
        
        const totalInstructions = Object.values(this.stats.instructionCounts)
            .reduce((a, b) => a + b, 0);

        // Calcul de l'efficacité du code
        const movements = this.stats.instructionCounts['>'] + this.stats.instructionCounts['<'];
        const operations = this.stats.instructionCounts['+'] + this.stats.instructionCounts['-'] + 
                          this.stats.instructionCounts['.'] + this.stats.instructionCounts[','];
        const efficiency = operations / Math.max(movements + operations, 1);

        return {
            performance: {
                totalSteps: this.stats.totalSteps,
                executionTimeMs: executionTime,
                stepsPerSecond: executionTime > 0 ? (this.stats.totalSteps / executionTime * 1000) : 0,
                efficiency: efficiency
            },
            
            memory: {
                cellsUsed: this.stats.cellsUsed.size,
                memoryRange: this.stats.maxPtrReached - this.stats.minPtrReached + 1,
                memoryEfficiency: this.stats.cellsUsed.size / Math.max(this.stats.maxPtrReached + 1, 1),
                readWriteRatio: this.stats.memoryReads / Math.max(this.stats.memoryWrites, 1),
                errorEvents: this.stats.overflowCount + this.stats.underflowCount
            },
            
            loops: {
                maxDepth: this.stats.maxLoopDepth,
                totalIterations: this.stats.loopIterations,
                averageIterationsPerLoop: this.stats.instructionCounts['['] > 0 ? 
                    this.stats.loopIterations / this.stats.instructionCounts['['] : 0
            },
            
            threading: {
                forksCreated: this.stats.forksCreated,
                maxConcurrentThreads: this.stats.maxConcurrentThreads
            }
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

/**
 * Analyseur de statistiques pour l'apprentissage de Brainfuck
 */
class BrainfuckStatsAnalyzer {
    static generateReport(interpreter) {
        const stats = interpreter.stats;
        const analysis = this.analyzeStats(stats);
        
        return {
            html: this.generateHTML(analysis, stats),
            markdown: this.generateMarkdown(analysis, stats),
            summary: this.generateSummary(analysis, stats)
        };
    }

    static analyzeStats(stats) {
        const executionTime = stats.executionEndTime ? 
            (stats.executionEndTime - stats.executionStartTime) : 0;
        
        const totalInstructions = Object.values(stats.instructionCounts)
            .reduce((a, b) => a + b, 0);
        
        return {
            performance: {
                totalSteps: stats.totalSteps,
                executionTimeMs: executionTime,
                stepsPerSecond: executionTime > 0 ? (stats.totalSteps / executionTime * 1000) : 0,
                efficiency: this.calculateEfficiency(stats)
            },
            
            memory: {
                cellsUsed: stats.cellsUsed.size,
                memoryRange: stats.maxPtrReached - stats.minPtrReached + 1,
                memoryEfficiency: stats.cellsUsed.size / Math.max(stats.maxPtrReached + 1, 1),
                readWriteRatio: stats.memoryReads / Math.max(stats.memoryWrites, 1),
                errorEvents: stats.overflowCount + stats.underflowCount
            },
            
            loops: {
                maxDepth: stats.maxLoopDepth,
                totalIterations: stats.loopIterations,
                averageIterationsPerLoop: stats.instructionCounts['['] > 0 ? 
                    stats.loopIterations / stats.instructionCounts['['] : 0,
                complexity: this.calculateLoopComplexity(stats)
            },
            
            instructions: {
                distribution: this.calculateInstructionDistribution(stats.instructionCounts),
                mostUsed: this.getMostUsedInstructions(stats.instructionCounts),
                balance: this.calculateInstructionBalance(stats.instructionCounts)
            },
            
            io: {
                inputOutput: stats.inputCharsRead + stats.outputCharsWritten,
                ioRatio: stats.outputCharsWritten / Math.max(stats.inputCharsRead, 1)
            },
            
            recommendations: this.generateRecommendations(stats)
        };
    }

    // Méthodes utilitaires pour les calculs
    static calculateEfficiency(stats) {
        const movements = stats.instructionCounts['>'] + stats.instructionCounts['<'];
        const operations = stats.instructionCounts['+'] + stats.instructionCounts['-'] + 
                          stats.instructionCounts['.'] + stats.instructionCounts[','];
        return operations / Math.max(movements + operations, 1);
    }

    static calculateInstructionDistribution(counts) {
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const distribution = {};
        for (const [inst, count] of Object.entries(counts)) {
            distribution[inst] = total > 0 ? count / total : 0;
        }
        return distribution;
    }

    static getMostUsedInstructions(counts) {
        return Object.entries(counts)
            .map(([instruction, count]) => ({ instruction, count }))
            .sort((a, b) => b.count - a.count);
    }

    static calculateInstructionBalance(counts) {
        const increments = counts['+'];
        const decrements = counts['-'];
        const rights = counts['>'];
        const lefts = counts['<'];
        
        const valueBalance = increments + decrements > 0 ? 
            Math.abs(increments - decrements) / (increments + decrements) : 0;
        const pointerBalance = rights + lefts > 0 ? 
            Math.abs(rights - lefts) / (rights + lefts) : 0;
        
        return (1 - (valueBalance + pointerBalance) / 2) * 100;
    }

    static calculateLoopComplexity(stats) {
        if (stats.maxLoopDepth === 0) return 0;
        return Math.min(stats.maxLoopDepth / 3, 1); // Normalisé sur 3 niveaux max
    }

    static generateRecommendations(stats) {
        const recommendations = [];
        const efficiency = this.calculateEfficiency(stats);
        
        if (efficiency < 0.4) {
            recommendations.push({
                type: 'warning',
                title: '🚨 Efficacité faible',
                message: 'Beaucoup de mouvements de pointeur. Essayez de regrouper vos opérations sur des cellules adjacentes.'
            });
        } else if (efficiency > 0.8) {
            recommendations.push({
                type: 'success',
                title: '✅ Excellent code',
                message: 'Votre code est très efficace avec un bon ratio opérations/mouvements!'
            });
        }
        
        if (stats.maxLoopDepth > 4) {
            recommendations.push({
                type: 'warning',
                title: '🔄 Boucles complexes',
                message: 'Boucles très imbriquées détectées. Considérez simplifier la logique pour une meilleure lisibilité.'
            });
        }
        
        if (stats.overflowCount > 0 || stats.underflowCount > 0) {
            recommendations.push({
                type: 'info',
                title: '⚠️ Débordements détectés',
                message: `${stats.overflowCount + stats.underflowCount} débordements de valeurs. Vérifiez la logique de vos incréments/décréments.`
            });
        }
        
        if (stats.cellsUsed.size > 100) {
            recommendations.push({
                type: 'info',
                title: '🧠 Utilisation mémoire élevée',
                message: 'Beaucoup de cellules utilisées. Excellent pour des programmes complexes!'
            });
        }
        
        return recommendations;
    }

    static generateHTML(analysis, stats) {
        return `
        <div class="brainfuck-stats-report">
            <div class="stats-header">
                <h2>📊 Rapport d'Analyse Brainfuck</h2>
                <p>Synthèse complète de l'exécution de votre programme</p>
            </div>

            <div class="stats-grid">
                ${this.generatePerformanceCard(analysis.performance)}
                ${this.generateMemoryCard(analysis.memory)}
                ${this.generateLoopsCard(analysis.loops)}
                ${this.generateInstructionsCard(analysis.instructions, stats)}
            </div>

            <div class="recommendations">
                <h3>💡 Recommandations Pédagogiques</h3>
                ${analysis.recommendations.map(rec => 
                    `<div class="recommendation ${rec.type}">
                        <strong>${rec.title}</strong><br>
                        ${rec.message}
                    </div>`
                ).join('')}
            </div>
        </div>`;
    }

    static generateMarkdown(analysis, stats) {
        let markdown = `# 📊 Rapport d'Analyse Brainfuck\\n\\n`;
        
        markdown += `## ⚡ Performance\\n`;
        markdown += `- **Étapes totales :** ${analysis.performance.totalSteps.toLocaleString()}\\n`;
        markdown += `- **Temps d'exécution :** ${analysis.performance.executionTimeMs.toFixed(2)}ms\\n`;
        markdown += `- **Vitesse :** ${Math.round(analysis.performance.stepsPerSecond).toLocaleString()} étapes/sec\\n`;
        markdown += `- **Efficacité :** ${(analysis.performance.efficiency * 100).toFixed(1)}%\\n\\n`;
        
        markdown += `## 🧠 Mémoire\\n`;
        markdown += `- **Cellules utilisées :** ${analysis.memory.cellsUsed}\\n`;
        markdown += `- **Portée mémoire :** ${analysis.memory.memoryRange}\\n`;
        markdown += `- **Efficacité mémoire :** ${(analysis.memory.memoryEfficiency * 100).toFixed(1)}%\\n`;
        markdown += `- **Événements d'erreur :** ${analysis.memory.errorEvents}\\n\\n`;
        
        markdown += `## 🔄 Boucles\\n`;
        markdown += `- **Profondeur max :** ${analysis.loops.maxDepth}\\n`;
        markdown += `- **Itérations totales :** ${analysis.loops.totalIterations.toLocaleString()}\\n`;
        markdown += `- **Moyenne par boucle :** ${analysis.loops.averageIterationsPerLoop.toFixed(1)}\\n\\n`;
        
        markdown += `## 📝 Instructions\\n`;
        const mostUsed = analysis.instructions.mostUsed[0];
        markdown += `- **Plus utilisée :** '${mostUsed.instruction}' (${mostUsed.count}×)\\n`;
        markdown += `- **Équilibre :** ${analysis.instructions.balance.toFixed(1)}%\\n\\n`;
        
        if (analysis.recommendations.length > 0) {
            markdown += `## 💡 Recommandations\\n`;
            analysis.recommendations.forEach(rec => {
                markdown += `- **${rec.title}** : ${rec.message}\\n`;
            });
        }
        
        return markdown;
    }

    static generateSummary(analysis, stats) {
        return {
            performance: analysis.performance,
            memory: analysis.memory,
            loops: analysis.loops,
            instructions: analysis.instructions,
            io: analysis.io,
            recommendations: analysis.recommendations,
            
            // Résumé textuel
            overview: {
                efficiency: analysis.performance.efficiency > 0.8 ? 'Excellent' : 
                           analysis.performance.efficiency > 0.6 ? 'Bon' : 
                           analysis.performance.efficiency > 0.4 ? 'Moyen' : 'À améliorer',
                
                complexity: analysis.loops.maxDepth > 4 ? 'Complexe' : 
                           analysis.loops.maxDepth > 2 ? 'Modéré' : 'Simple',
                
                memoryUsage: analysis.memory.cellsUsed > 100 ? 'Élevée' : 
                            analysis.memory.cellsUsed > 10 ? 'Modérée' : 'Faible',
                
                hasErrors: analysis.memory.errorEvents > 0,
                hasThreading: stats.forksCreated > 0
            }
        };
    }

    // Méthodes helper pour generateHTML()
    static generatePerformanceCard(perf) {
        const efficiency = Math.round(perf.efficiency * 100);
        return `
            <div class="stat-card">
                <div class="stat-title">⚡ Performance</div>
                <div class="stat-value">${perf.totalSteps.toLocaleString()}</div>
                <div class="stat-detail">étapes exécutées</div>
                
                <div class="stat-detail">
                    ⏱️ Temps: ${perf.executionTimeMs.toFixed(2)}ms
                </div>
                <div class="stat-detail">
                    🚀 Vitesse: ${Math.round(perf.stepsPerSecond).toLocaleString()} étapes/sec
                </div>
                <div class="stat-detail">Efficacité: ${efficiency}%</div>
            </div>`;
    }

    static generateMemoryCard(memory) {
        const efficiency = Math.round(memory.memoryEfficiency * 100);
        return `
            <div class="stat-card">
                <div class="stat-title">🧠 Utilisation Mémoire</div>
                <div class="stat-value">${memory.cellsUsed}</div>
                <div class="stat-detail">cellules utilisées</div>
                
                <div class="stat-detail">
                    📏 Portée: ${memory.memoryRange} cellules
                </div>
                <div class="stat-detail">
                    ⚖️ Ratio Lecture/Écriture: ${memory.readWriteRatio.toFixed(2)}
                </div>
                ${memory.errorEvents > 0 ? 
                    `<div class="stat-detail">⚠️ Événements d'erreur: ${memory.errorEvents}</div>` : ''}
                <div class="stat-detail">Efficacité: ${efficiency}%</div>
            </div>`;
    }

    static generateLoopsCard(loops) {
        return `
            <div class="stat-card">
                <div class="stat-title">🔄 Analyse des Boucles</div>
                <div class="stat-value">${loops.maxDepth}</div>
                <div class="stat-detail">profondeur maximale</div>
                
                <div class="stat-detail">
                    🔁 Itérations totales: ${loops.totalIterations.toLocaleString()}
                </div>
                <div class="stat-detail">
                    📊 Moyenne par boucle: ${loops.averageIterationsPerLoop.toFixed(1)}
                </div>
            </div>`;
    }

    static generateInstructionsCard(instructions, stats) {
        const mostUsed = instructions.mostUsed[0];
        return `
            <div class="stat-card">
                <div class="stat-title">📝 Instructions</div>
                <div class="stat-value">${mostUsed.instruction}</div>
                <div class="stat-detail">instruction la plus utilisée (${mostUsed.count}×)</div>
                
                <div class="stat-detail">
                    ⚖️ Équilibre: ${instructions.balance.toFixed(1)}%
                </div>
            </div>`;
    }
}

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BrainfuckInterpreter, BrainfuckStatsAnalyzer };
}