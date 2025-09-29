# 🧠 BrainJS: Interpréteur Brainfuck en JavaScript avec Multithreading

Un interpréteur **Brainfuck** complet, implémenté en **JavaScript pur (Vanilla JS)**, avec une interface utilisateur interactive et **support du multithreading**. Il permet l'exécution pas à pas, la visualisation détaillée de l'état de la mémoire et inclut un éditeur avec coloration syntaxique. Cette version étend le Brainfuck standard avec la **commande `y` de fork**.

-----

## ✨ Fonctionnalités Clés

*   **Séparation des responsabilités** : Le moteur Brainfuck est isolé dans **`BrainfuckInterpreter.js`**.
*   **🔀 Multithreading avec Fork** : Nouvelle commande `y` qui permet la création de threads parallèles.
*   **Éditeur avec Coloration Syntaxique** : Un éditeur de code personnalisé qui colore les commandes Brainfuck (y compris `y`).
*   **Visualisation Multi-Thread** : Interface dédiée pour suivre l'état de tous les threads actifs.
*   **Protection Fork Bomb** : Limite configurable du nombre de threads pour éviter les explosions.
*   **Exécution Pas à Pas (Step-by-Step)** : Exécute une seule instruction à la fois, idéale pour le débogage et la pédagogie.
*   **Exécution Complète Multi-Thread** : Exécute tous les threads jusqu'à completion.
*   **Gestion des Entrées/Sorties** : Zones de texte dédiées pour fournir des données d'entrée et visualiser la sortie.
*   **Visualisation de l'État en Temps Réel** avec support multi-thread.

-----

## 🔀 Nouvelle Commande: Fork (`y`)

### Comportement de `y`
Quand la commande `y` est rencontrée, le thread actuel **fork** :

| Thread | Action |
|--------|--------|
| **Parent** | La cellule active est mise à `0` |
| **Enfant** | Le pointeur avance d'une position (`ptr++`) et la nouvelle cellule est mise à `1` |

### Exemples

#### Exemple Simple
```brainfuck
++y
```
**Résultat :**
- Thread T0 (parent) : `cell[0] = 0`
- Thread T1 (enfant) : `cell[1] = 1`

#### ⚠️ Exemple Dangereux (Fork Bomb)
```brainfuck
+[y+]
```
**Attention !** Ce code créerait une explosion exponentielle de threads :
1. `cell[0] = 1` → Entre dans la boucle
2. `y` → Fork (Thread T0: `cell[0] = 0`, Thread T1: `cell[1] = 1`)
3. `+` → Les deux threads incrémentent leur cellule (toutes deviennent `1`)
4. `]` → Retour au `[` car les cellules ne sont pas nulles
5. Répétition infinie avec doublement des threads à chaque tour !

**Protection :** Une limite de 100 threads actifs par défaut empêche les fork bombs.

-----

## 🔧 Commandes Brainfuck Supportées

| Commande | Action | Multithreading |
|----------|--------|----------------|
| `>` | Avance le pointeur | ✅ Par thread |
| `<` | Recule le pointeur | ✅ Par thread |
| `+` | Incrémente la cellule | ✅ Par thread |
| `-` | Décrémente la cellule | ✅ Par thread |
| `.` | Sortie caractère | ✅ Par thread |
| `,` | Entrée caractère | ✅ Par thread |
| `[` | Début de boucle | ✅ Par thread |
| `]` | Fin de boucle | ✅ Par thread |
| **`y`** | **Fork thread** | ✅ **Nouveau !** |

-----

## 🚀 Démarrage Rapide

Ce projet ne nécessite aucune dépendance externe ni configuration de serveur.

### Structure du Projet

```
brainjs/
├── index.html                # Interface utilisateur avec support multi-thread
├── BrainfuckInterpreter.js   # Moteur avec threading (commande 'y')
└── README.md                 # Ce fichier
```

### Lancement

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/vfarcy/brainfuck.git
    cd brainfuck
    ```
2.  **Ouvrir l'application** :
    Ouvrez le fichier **`index.html`** directement dans votre navigateur web.

-----

## 💻 Architecture du Code

Le projet est conçu avec une séparation claire entre la Vue (HTML/UI) et le Modèle (Logique d'interpréteur).

### 1\. `BrainfuckInterpreter.js` (Le Moteur avec Threading)

| Méthode | Rôle |
| :--- | :--- |
| `constructor(code, input, threadId, parentId)` | Initialise un thread avec gestion du threading. |
| `handleFork()` | **Nouveau** : Gère la commande `y` avec création d'un thread enfant. |
| `step()` | Exécute une instruction (incluant `y`). |
| `runAll()` | Exécute un thread jusqu'à l'arrêt. |
| `runAllThreads()` | **Nouveau** : Exécute tous les threads actifs jusqu'à completion. |
| `getAllThreadStates()` | **Nouveau** : Retourne l'état de tous les threads. |
| `resetThreadManager()` | **Nouveau** : Remet à zéro le gestionnaire de threads. |

### 2\. `index.html` (Interface Multi-Thread)

Nouvelles fonctionnalités UI :
- **Section Thread Info** : Affiche l'ID du thread actuel et ses relations.
- **Vue Multi-Thread** : Tableau de bord de tous les threads actifs.
- **Contrôle de Limite** : Configuration de la limite maximale de threads.
- **Coloration `y`** : La commande fork est mise en évidence en orange.

-----

## 🛡️ Sécurité et Limites

- **Limite de threads** : 100 par défaut (configurable)
- **Limite d'exécution** : 100 000 étapes par thread
- **Protection mémoire** : Extension automatique si dépassement
- **Validation syntaxe** : Détection des boucles `[]` non équilibrées

-----

## 🧪 Exemples de Test

### Fork Simple
```brainfuck
+++y>+++y
```

### Fibonacci avec Fork
```brainfuck
+>+[>>+>y<<<-]
```

### ⚠️ Fork Bomb (À éviter !)
```brainfuck
+[y+]
```

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

**Auteur:** [Valéry Farcy](https://github.com/vfarcy)
