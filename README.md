# 🧠 BrainJS: Interpréteur Brainfuck en JavaScript

Un interpréteur **Brainfuck** complet, implémenté en **JavaScript pur (Vanilla JS)**, avec une interface utilisateur interactive permettant l'exécution pas à pas et la visualisation de l'état de la mémoire. Ce projet sépare clairement la logique de l'interpréteur de l'interface utilisateur.

-----

## ✨ Fonctionnalités Clés

  * **Séparation des responsabilités** : Le moteur Brainfuck est isolé dans **`BrainfuckInterpreter.js`**.
  * **Exécution Pas à Pas (Step-by-Step)** : Exécute une seule instruction à la fois, idéale pour le débogage et la pédagogie.
  * **Visualisation de l'État en Temps Réel** :
      * **Pointeur d'Instruction (IP)** : Mise en évidence de l'instruction en cours dans le code source.
      * **Pointeur de Cellule (PTR)** : Indique la cellule mémoire active.
      * **État de la Mémoire** : Affiche un aperçu des cellules autour du pointeur, avec la cellule active mise en évidence.
    * **Coloration Syntaxique Interactive** : L'éditeur et la vue d'exécution colorent chaque instruction pour faciliter l'écriture et l'analyse du code.
  * **Thème Clair/Sombre** : Bascule instantanée avec mémorisation de la préférence et harmonie des couleurs du moteur et de l'UI.
  * **Surlignage de Sélection** : La sélection dans l'éditeur reste visible même avec le texte transparent grâce à une surcouche synchronisée.
  * **Exécution Complète (Run All)** : Exécute le programme jusqu'à la fin.
  * **Gestion des Boucles** : Utilisation d'une carte de boucles (`loopMap`) pré-calculée pour une gestion efficace des sauts (`[]`).

-----

## 🚀 Démarrage Rapide

Ce projet ne nécessite aucune dépendance externe ni configuration de serveur.

### Structure du Projet

```
brainjs/
├── index.html            # Interface utilisateur et logique de contrôle (Vue)
├── BrainfuckInterpreter.js # Le moteur de l'interpréteur (Logique pure)
└── README.md             # Ce fichier
```

### Lancement

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-utilisateur/brainjs.git
    cd brainjs
    ```
2.  **Ouvrir l'application** :
    Ouvrez le fichier **`index.html`** directement dans votre navigateur web.

-----

## 💻 Architecture du Code

Le projet est conçu avec une séparation claire entre la Vue (HTML/UI) et le Modèle (Logique d'interpréteur).

### 1\. `BrainfuckInterpreter.js` (Le Moteur)

Ce fichier définit la classe **`BrainfuckInterpreter`**. Il est entièrement indépendant du DOM et gère :

| Méthode | Rôle |
| :--- | :--- |
| `constructor(code, input)` | Initialise la mémoire et pré-calcule le `loopMap`. |
| `buildLoopMap(code)` | Gère la validation et le mappage des crochets `[` et `]`. |
| `step()` | La fonction clé : exécute **une seule instruction** (`>`, `<`, `+`, `-`, `.`, `,`, `[`, `]`). |
| `runAll()` | Exécute `step()` en boucle jusqu'à l'arrêt. |
| `getState()` | Fournit un instantané de l'état interne (`ptr`, `ip`, `output`, etc.) à l'interface. |

### 2\. `index.html` (Le Contrôleur et la Vue)

Ce fichier est responsable de l'interaction utilisateur :

1.  **Inclusion du Moteur** : Il charge `BrainfuckInterpreter.js` via `<script src="..."></script>`.
2.  **Contrôle** : Le script intégré écoute les clics (`run-all`, `step-btn`, `reset-btn`).
3.  **Mise à Jour de l'UI** : La fonction `updateUI()` est appelée après chaque action pour lire l'état via `interpreter.getState()` et rafraîchir tous les affichages visuels (mémoire, pointeurs, code en cours).

-----

## 🤝 Contribution

Les contributions sont les bienvenues \! Si vous trouvez un bug ou avez une suggestion d'amélioration :

1.  Faites un *fork* du projet.
2.  Créez une nouvelle branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-feature`).
3.  *Committez* vos changements.
4.  Ouvrez une **Pull Request** (PR).

-----

## 📜 Licence

Ce projet est sous licence MIT.

**Auteur:**[Valéry Farcy]
