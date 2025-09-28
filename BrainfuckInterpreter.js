const MEMORY_SIZE = 30000;
const MAX_BYTE_VALUE = 256;
const VALID_CHARS = '><+-.,[]';

/**
 * BrainfuckInterpreter
 *
 * Interprète le code Brainfuck en gérant la mémoire, le pointeur de cellule,
 * et le pointeur d'instruction. Il supporte l'exécution pas à pas.
 */
class BrainfuckInterpreter {
    /**
     * @param {string} code Le programme Brainfuck à exécuter.
     * @param {string} [input=''] L'entrée utilisateur simulée pour la commande ','.
     */
    constructor(code, input = '') {
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

            default:
                break;
        }

        this.ip++; 
        return true;
    }

    /**
     * Exécute le programme jusqu'à la fin.
     */
    runAll() {
        const maxSteps = 10000000;
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
     * Retourne l'état actuel de l'interpréteur pour l'affichage.
     */
    getState() {
        return {
            ptr: this.ptr,
            ip: this.ip,
            code: this.code,
            memoryFull: this.memory,
            output: this.output,
            halted: this.halted,
            originalCode: this.originalCode,
            codeMap: this.codeMap
        };
    }
}
