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
        // Nettoyer le code pour ne garder que les instructions Brainfuck
        this.code = code.replace(/[^><+\-.,[\]]/g, '');
        this.input = input.split(''); // Convertir l'entrée en tableau de caractères
        this.memory = new Array(30000).fill(0); // 30000 cellules de mémoire (convention)
        this.ptr = 0; // Pointeur de cellule (Memory Pointer)
        this.ip = 0; // Pointeur d'instruction (Instruction Pointer)
        this.output = ''; // Chaîne pour l'affichage de la sortie
        this.loopMap = this.buildLoopMap(this.code); // Carte des sauts de boucles
        this.halted = false; // Indique si le programme est terminé
    }

    /**
     * Prépare une carte (Map) pour lier les crochets d'ouverture '[' à
     * leurs crochets de fermeture ']' correspondants, et vice-versa.
     * Cela permet de sauter rapidement dans les boucles sans reparcourir le code.
     * @param {string} code Le programme Brainfuck.
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
                    throw new Error(`Erreur de syntaxe: ']' sans '[' à l'index ${i}.`);
                }
                map.set(open, i);
                map.set(i, open);
            }
        }
        if (stack.length > 0) {
            throw new Error(`Erreur de syntaxe: '[' sans ']' (reste ${stack.length} non fermés).`);
        }
        return map;
    }

    /**
     * Exécute une seule instruction Brainfuck et met à jour l'état interne.
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
                // Optionnel: agrandir la mémoire si nécessaire, ou ignorer si on dépasse les 30000
                if (this.ptr >= this.memory.length) {
                    // Pour simplifier et éviter l'allocation dynamique dans cet exemple :
                    // On pourrait lancer une erreur ou augmenter this.memory.length
                    console.warn("Pointeur de mémoire hors des limites définies (30000).");
                }
                break;

            case '<':
                this.ptr = Math.max(0, this.ptr - 1); // Le pointeur ne doit pas être négatif
                break;

            case '+':
                // Incrémenter la cellule, avec débordement (wraparound) de 255 à 0
                this.memory[this.ptr] = (this.memory[this.ptr] + 1) % 256;
                break;

            case '-':
                // Décrémenter la cellule, avec sous-débordement (wraparound) de 0 à 255
                this.memory[this.ptr] = (this.memory[this.ptr] - 1 + 256) % 256;
                break;

            case '.':
                // Ajouter le caractère correspondant à la valeur ASCII/Unicode de la cellule à la sortie
                this.output += String.fromCharCode(this.memory[this.ptr]);
                break;

            case ',':
                // Lire le prochain caractère de l'entrée. Si l'entrée est vide, lit 0.
                const char = this.input.shift();
                this.memory[this.ptr] = char !== undefined ? char.charCodeAt(0) : 0;
                break;

            case '[':
                // Si la valeur de la cellule est zéro, sauter à l'instruction après le ']' correspondant
                if (this.memory[this.ptr] === 0) {
                    this.ip = this.loopMap.get(this.ip);
                }
                break;

            case ']':
                // Si la valeur de la cellule n'est PAS zéro, sauter à l'instruction après le '[' correspondant
                if (this.memory[this.ptr] !== 0) {
                    this.ip = this.loopMap.get(this.ip);
                }
                break;

            // Par convention, les autres caractères sont ignorés (sauf s'ils sont déjà filtrés)
            default:
                break;
        }

        this.ip++; // Avancer au prochain pointeur d'instruction
        return true;
    }

    /**
     * Exécute le programme jusqu'à la fin ou jusqu'à ce qu'il s'arrête.
     * Cette méthode est utilisée pour l'exécution complète (Run All).
     * @returns {string} La sortie générée.
     */
    runAll() {
        // Limite de sécurité pour éviter les boucles infinies qui figent le navigateur
        const maxSteps = 10000000;
        let steps = 0;

        while (this.step() && steps < maxSteps) {
            steps++;
        }

        if (steps >= maxSteps) {
            console.error("Limite d'étapes d'exécution atteinte. Programme possiblement en boucle infinie.");
            this.halted = true;
        }

        return this.output;
    }

    /**
     * Retourne l'état actuel de l'interpréteur pour la visualisation dans l'interface.
     * @returns {{ptr: number, ip: number, memoryFull: number[], output: string, halted: boolean}}
     */
    getState() {
        return {
            ptr: this.ptr, // Pointeur de cellule
            ip: this.ip,   // Pointeur d'instruction
            memoryFull: this.memory, // La mémoire complète (pour afficher l'extrait)
            output: this.output,     // La sortie accumulée
            halted: this.halted      // État de l'exécution
        };
    }
}

// Optionnel: si vous utilisez des modules ES6, exportez la classe
// export default BrainfuckInterpreter;



