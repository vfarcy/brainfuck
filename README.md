# 🧠 BrainJS: Interpréteur Brainfuck en JavaScript

Un interpréteur **Brainfuck** complet, implémenté en JavaScript pur (Vanilla JS), avec une interface utilisateur interactive permettant l'exécution pas à pas et la visualisation de l'état de la mémoire. Idéal pour comprendre le fonctionnement des langages de programmation de très bas niveau.

## ✨ Fonctionnalités

  * **Saisie de Code** : Entrez votre programme Brainfuck directement dans l'interface.
  * **Exécution Complète (Run All)** : Exécute le programme entier et affiche immédiatement le résultat en sortie.
  * **Exécution Pas à Pas (Step-by-Step)** : Permet d'exécuter **une seule instruction** à la fois, facilitant le débogage et la compréhension du flux.
  * **Visualisation de l'État** : Affiche en temps réel :
      * Le **Pointeur d'Instruction (IP)** : L'index de l'instruction Brainfuck en cours d'exécution.
      * Le **Pointeur de Cellule (PTR)** : L'index de la cellule mémoire active.
      * L'**État de la Mémoire** : Affiche les cellules mémoire autour du pointeur, avec la cellule active mise en évidence.
  * **Gestion des Boucles** : Implémentation robuste des boucles (`[]`) avec pré-calcul des sauts pour une exécution efficace.
  * **Entrées/Sorties** : Gère les commandes de sortie (`.`) et d'entrée (`,`).

-----

## 🚀 Démarrage Rapide

Ce projet est conçu pour être lancé localement sans aucune dépendance serveur ou librairie externe.

### Prérequis

  * Un navigateur web moderne (Chrome, Firefox, Safari, Edge).

### Installation et Lancement

1.  **Cloner le dépôt** :

    ```bash
    git clone https://github.com/votre-utilisateur/brainjs.git
    cd brainjs
    ```

2.  **Ouvrir l'application** :
    Ouvrez simplement le fichier `index.html` dans votre navigateur web.

    *(Astuce: Sur de nombreux systèmes, vous pouvez faire un clic droit sur `index.html` et choisir "Ouvrir avec..." puis sélectionner votre navigateur.)*

-----

## 💻 Structure du Projet

Le projet est minimaliste et se compose de trois fichiers principaux :

```
brainjs/
├── index.html          # L'interface utilisateur (HTML) et la logique de contrôle (Script principal)
└── BrainfuckInterpreter.js  # (Optionnel, si vous séparez la classe) Contient la logique d'interprétation pure.
├── README.md           # Ce fichier
```

### Détail des composants clés

| Fichier/Classe | Rôle | Description |
| :--- | :--- | :--- |
| `index.html` | Interface / Contrôle | Contient le HTML (formulaire, boutons, affichages) et le script qui gère les événements et appelle l'interpréteur. |
| `BrainfuckInterpreter` | Logique Core | La classe JavaScript qui gère la mémoire, le pointeur, le code et l'exécution des instructions (`step`, `runAll`). |
| `updateUI()` | Fonction de l'UI | Fonction clé qui lit l'état de l'interpréteur et met à jour les éléments visuels (mémoire, PTR, IP, output). |

-----

## 🔧 Utilisation de la Classe Interpréteur

L'interpréteur est encapsulé dans la classe `BrainfuckInterpreter` et peut être utilisé comme suit :

```javascript
// 1. Initialisation
const code = '++++++++[>++++<-]>.'; // Exemple "Hello World" partiel
const interpreter = new BrainfuckInterpreter(code, 'input_simule');

// 2. Exécution pas à pas
interpreter.step(); // Exécute la première instruction
interpreter.step(); // Exécute la deuxième instruction
// ...

// 3. Exécution complète
interpreter.runAll();

// 4. Récupération de l'état
const etatActuel = interpreter.getState();
console.log(`Sortie: ${etatActuel.output}`);
console.log(`Pointeur mémoire: ${etatActuel.ptr}`);
```

### Méthodes Clés

| Méthode | Description |
| :--- | :--- |
| `constructor(code, input)` | Initialise la mémoire, le pointeur et pré-calcule la carte des boucles. |
| `buildLoopMap(code)` | **Pré-calcule les sauts** entre `[` et `]` pour une exécution rapide des boucles. |
| `step()` | Exécute **une seule instruction** et avance le Pointeur d'Instruction (IP). |
| `runAll()` | Exécute toutes les instructions restantes jusqu'à la fin. |
| `getState()` | Retourne un objet contenant l'état actuel (`ptr`, `ip`, `output`, `memoryFull`). |

-----

## 🤝 Contribution

Les contributions sont les bienvenues \! Si vous trouvez un bug ou avez une suggestion d'amélioration, n'hésitez pas à :

1.  **Faire un "Fork"** de ce dépôt.
2.  Créer une nouvelle branche (`git checkout -b feature/amelioration-x`).
3.  Commiter vos changements (`git commit -m 'feat: ajoute la fonctionnalité x'`).
4.  Pousser vers la branche (`git push origin feature/amelioration-x`).
5.  Ouvrir une **Pull Request** (PR).

-----

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](https://www.google.com/search?q=LICENSE) pour plus de détails.

-----

## 📧 Contact

Auteur: [Votre Nom/Pseudonyme]
GitHub: [@VotreNomUtilisateur](https://www.google.com/search?q=https://github.com/VotreNomUtilisateur)
E-mail: [votre.email@exemple.com]
