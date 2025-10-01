# 🧠 BrainJS: Interpréteur Brainfuck JavaScript avec Multithreading Unix-Style# 🧠 BrainJS: Interpréteur Brainfuck JavaScript avec Multithreading# 🧠 BrainJS: Interpréteur Brainfuck JavaScript avec Multithreading# 🧠 BrainJS: Interpréteur Brainfuck JavaScript avec Multithreading



![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)

![License](https://img.shields.io/badge/license-MIT-green.svg)

![Build](https://img.shields.io/badge/build-2025--10--01-lightgreen.svg)![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

![Multithreading](https://img.shields.io/badge/Multithreading-Unix--Style-orange.svg)![License](https://img.shields.io/badge/license-MIT-green.svg)



**Interpréteur Brainfuck complet en JavaScript pur** avec support du **multithreading Unix-style authentique**. Interface interactive avancée avec exécution pas-à-pas, visualisation mémoire en temps réel, éditeur avec coloration syntaxique et support professionnel du fork POSIX.![Build](https://img.shields.io/badge/build-2025--10--01-lightgreen.svg)![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)



## 🚀 Démarrage Rapide



### InstallationUn interpréteur **Brainfuck** complet en **JavaScript pur**, avec interface interactive et **support du multithreading Unix-style**. Inclut l'exécution pas à pas, la visualisation de la mémoire et un éditeur avec coloration syntaxique.![License](https://img.shields.io/badge/license-MIT-green.svg)![License](https://img.shields.io/badge/license-MIT-green.svg)

```bash

# Cloner le repository

git clone https://github.com/vfarcy/brainfuck.git

cd brainfuck## 🚀 Démarrage Rapide![Build](https://img.shields.io/badge/build-2025--10--01-lightgreen.svg)![Build](https://img.shields.io/badge/build-2025--10--01-lightgreen.svg)



# Lancer l'application

# Option 1: Ouvrir directement dans le navigateur

open index.html1. **Cloner le projet** :



# Option 2: Serveur local (recommandé)   ```bash

python -m http.server 8000

# Puis ouvrir http://localhost:8000   git clone https://github.com/vfarcy/brainfuck.gitUn interpréteur **Brainfuck** complet en **JavaScript pur**, avec interface interactive et **support du multithreading Unix-style**. Inclut l'exécution pas à pas, la visualisation de la mémoire et un éditeur avec coloration syntaxique.Un interpréteur **Brainfuck** complet, implémenté en **JavaScript pur (Vanilla JS)**, avec une interface utilisateur interactive et **support du multithreading**. Il permet l'exécution pas à pas, la visualisation détaillée de l'état de la mémoire et inclut un éditeur avec coloration syntaxique. Cette version étend le Brainfuck standard avec la **commande `f` de fork**.

```

   cd brainfuck

### Premier Test

```brainfuck   ```

# Test simple

+++.          # Affiche caractère ASCII 3



# Test multithreading2. **Lancer l'application** : Ouvrir `index.html` dans votre navigateur## 🚀 Démarrage Rapide## 🆕 Nouveautés v1.5.0

f[+++.]       # Fork: parent affiche 3, enfant n'affiche rien



# Test identification threads

f.            # Parent affiche PID enfant, enfant affiche 03. **Tester** : Essayez `+++.` ou `f.` pour voir le multithreading en action

```



### 🌐 Version en Ligne

**[🔗 Démo GitHub Pages](https://vfarcy.github.io/brainfuck/)**4. **Version en ligne** : [GitHub Pages](https://vfarcy.github.io/brainfuck/)1. **Cloner le projet** :### 🔀 **Fork Unix-Style Implementation**



---



## 🆕 Fonctionnalités v1.5.0## 🆕 Nouveautés v1.5.0   ```bash- **🔄 Sémantique Unix Authentique** : Fork retourne PID enfant au parent, 0 à l'enfant



### 🔀 Fork Unix-Style Authentique

- **✅ Sémantique POSIX complète** : Parent reçoit PID enfant (>0), enfant reçoit 0

- **✅ Exécution conditionnelle** : `f[code]` - seul le parent exécute le code### 🔀 Fork Unix-Style   git clone https://github.com/vfarcy/brainfuck.git- **⚡ Exécution Conditionnelle** : Permet aux threads parent/enfant d'exécuter du code différent

- **✅ Isolation mémoire** : 30 000 cellules indépendantes par thread

- **✅ Protection fork bomb** : Limite configurable (défaut: 8 threads)- **Sémantique POSIX authentique** : Parent reçoit PID enfant, enfant reçoit 0



### 🎨 Interface Utilisateur Avancée- **Exécution conditionnelle** : Threads parent/enfant suivent des chemins différents   cd brainfuck- **🎯 Compatibilité POSIX** : Comportement familier aux développeurs systèmes

- **Multi-mode** : Bascule automatique single/multi-thread

- **Identification visuelle** : 8 couleurs distinctes par thread- **Compatibilité Unix** : Comportement familier aux développeurs systèmes

- **Exécution temps réel** : Pas-à-pas ou complète avec visualisation

- **Cache persistant** : Préservation des sorties entre exécutions   ```- **🚀 Flexibilité Accrue** : Utilisation des boucles pour distinguer parent et enfant

- **Légende interactive** : Guide des couleurs et statuts threads

### 📚 Documentation Professionnelle

### 🏗️ Architecture Professionnelle

- **Structure modulaire** : Séparation moteur/interface- **Structure organisée** : Répertoire `docs/` avec guides complets

- **Documentation complète** : API, exemples, guides techniques

- **Templates GitHub** : Issues et PR standardisés- **Templates GitHub** : Issues et PR templates

- **Scripts déploiement** : Unix/Windows automatisés

- **Versioning NPM** : Gestion sémantique des versions- **Exemples interactifs** : Tests détaillés avec explications2. **Lancer l'application** : Ouvrir `index.html` dans votre navigateur### 📚 **Documentation Professionnelle**



---



## 📚 Documentation Technique## 🔀 Commande Fork (`f`) - Style Unix- **📁 docs/test-unix-fork.md** : Guide complet des tests Unix-style en format Markdown



### 📋 Commandes Brainfuck Étendues



| Commande | Action | Support Multithreading |Quand `f` est exécuté, le thread **fork** selon la sémantique Unix :3. **Tester** : Essayez `+++.` ou `f.` pour voir le multithreading en action- **📖 Documentation Structurée** : Organisation professionnelle dans le répertoire docs/

|----------|--------|------------------------|

| `>` | Avancer pointeur mémoire | ✅ Par thread |

| `<` | Reculer pointeur mémoire | ✅ Par thread |

| `+` | Incrémenter cellule actuelle | ✅ Par thread || Thread | Valeur Retournée | Comportement |- **🎯 Exemples Interactifs** : Tests détaillés avec explications techniques

| `-` | Décrémenter cellule actuelle | ✅ Par thread |

| `.` | Sortie caractère (ASCII) | ✅ Par thread avec couleur ||--------|------------------|--------------|

| `,` | Entrée caractère | ✅ Par thread |

| `[` | Début boucle (si cellule ≠ 0) | ✅ Par thread || **Parent** | PID enfant (> 0) | Continue avec l'ID du nouvel enfant |4. **Version en ligne** : [GitHub Pages](https://vfarcy.github.io/brainfuck/)- **📊 Concepts Avancés** : Patterns de programmation et applications pratiques

| `]` | Fin boucle (retour si cellule ≠ 0) | ✅ Par thread |

| **`f`** | **Fork Unix-style** | ✅ **Extension unique** || **Enfant** | 0 | Nouveau thread avec valeur zéro |



### 🔀 Sémantique Fork Unix-Style



#### Comportement POSIX Authentique### Exemples

```brainfuck

f             # Commande fork## 🆕 Nouveautés v1.5.0-----

```

#### Fork Simple

| Thread | Valeur Retournée | Comportement |

|--------|------------------|--------------|```brainfuck

| **Parent** | PID enfant (1-8) | Continue avec l'ID du nouvel enfant |

| **Enfant** | 0 | Nouveau thread avec valeur zéro |f.    # Parent affiche PID, enfant affiche 0



#### Exemples Pratiques```### 🔀 Fork Unix-Style## 🔧 Historique v1.3.1



**1. Fork Simple**

```brainfuck

f.    # Parent: affiche 0x01, Enfant: affiche 0x00#### Exécution Conditionnelle- **Sémantique POSIX authentique** : Parent reçoit PID enfant, enfant reçoit 0

```

```brainfuck

**2. Exécution Conditionnelle**

```brainfuckf[+++.]   # Seul le parent (PID>0) exécute +++.- **Exécution conditionnelle** : Threads parent/enfant suivent des chemins différents### 🚀 **Architecture Optimisée**

f[+++.]    # Seul le parent (PID>0) exécute +++.

``````



**3. Fork Parallèle**- **Compatibilité Unix** : Comportement familier aux développeurs systèmes- **🗑️ Méthodes Statiques Supprimées** : Élimination définitive de toutes les méthodes statiques obsolètes

```brainfuck

++f>++f.   # 3 threads: T0(2), T1(2), T2(2) avec positions différentes#### ⚠️ Fork Bomb (Éviter !)

```

```brainfuck- **🏗️ 100% Instance-Based** : Architecture entièrement basée sur les instances pour une meilleure encapsulation

**4. ⚠️ Fork Bomb (Éviter)**

```brainfuckf[f]      # Création récursive de threads

f[f]       # Création récursive - Protection: limite 8 threads

``````### 📚 Documentation Professionnelle- **⚡ Performance Améliorée** : Réduction de 14% de la taille du code (486 vs 566 lignes)



### 🎨 Identification Visuelle des Threads**Protection** : Limite de 8 threads simultanés par défaut.



| Thread ID | Couleur | Code Hex | Utilisation |- **Structure organisée** : Répertoire `docs/` avec guides complets- **🧹 Code Plus Propre** : Suppression de 80 lignes de code obsolète

|-----------|---------|----------|-------------|

| **T0** | 🔵 Bleu | `#2196F3` | Thread principal |## ✨ Fonctionnalités

| **T1** | 🟢 Vert | `#4CAF50` | Premier enfant |

| **T2** | 🟠 Orange | `#FF9800` | Deuxième enfant |- **Templates GitHub** : Issues et PR templates

| **T3** | 🟣 Violet | `#9C27B0` | Troisième enfant |

| **T4** | 🔴 Rouge | `#F44336` | Quatrième enfant |- **🔀 Multithreading** : Commande `f` pour créer des threads parallèles

| **T5** | 🟤 Marron | `#795548` | Cinquième enfant |

| **T6** | 🔘 Bleu-gris | `#607D8B` | Sixième enfant |- **👁️ Visualisation** : Interface dédiée multi-thread avec identification par couleur- **Exemples interactifs** : Tests détaillés avec explications### 🔧 **Améliorations Techniques**

| **T7** | 🩷 Rose | `#E91E63` | Septième enfant |

- **⚡ Exécution** : Mode pas à pas ou exécution complète

---

- **🎨 Éditeur** : Coloration syntaxique avec support de `f`- **✅ Exécution Pas à Pas Corrigée** : Fonctionnement parfait avec les threads multiples

## 🏗️ Architecture du Projet

- **🛡️ Sécurité** : Protection contre les fork bombs

### 📁 Structure des Fichiers

```- **📊 Debug** : Messages console détaillés## 🔀 Commande Fork (`f`) - Style Unix- **🎯 Détection Threads Optimisée** : Nouvelle méthode `hasMultipleActiveThreads()` plus efficace

brainfuck/                           # Racine du projet

├── 📄 index.html                    # Interface utilisateur (2014 lignes)

├── ⚙️ BrainfuckInterpreter.js       # Moteur principal (485 lignes)

├── 📦 package.json                  # Configuration NPM### Identification Visuelle des Threads- **🛡️ Gestion d'Erreurs Renforcée** : Try-catch autour de chaque exécution de thread

├── 📜 LICENSE                       # Licence MIT 2025

├── 📝 CHANGELOG.md                  # Historique des versions

├── 📚 docs/                         # Documentation technique

│   ├── 🔧 API.md                   # Référence API complète| Thread | Couleur | Code |Quand `f` est exécuté, le thread **fork** selon la sémantique Unix :- **📊 Debugging Amélioré** : Messages de log structurés et informatifs

│   ├── 📖 EXAMPLES.md              # Exemples et tutoriels

│   └── 🧪 test-unix-fork.md        # Guide tests Unix-style|--------|---------|------|

├── 🔧 scripts/                      # Scripts de déploiement

│   ├── deploy.sh                   # Déploiement Unix/Mac| T0 | 🔵 Bleu | `#2196F3` |

│   ├── deploy.bat                  # Déploiement Windows

│   ├── update-version.js           # Mise à jour versions| T1 | 🟢 Vert | `#4CAF50` |

│   └── update-version.sh           # Script version Unix

├── 🐙 .github/                      # Templates GitHub| T2 | 🟠 Orange | `#FF9800` || Thread | Valeur Retournée | Comportement |### 🎨 **Interface Utilisateur**

│   ├── ISSUE_TEMPLATE.md          # Template issues

│   └── PULL_REQUEST_TEMPLATE.md   # Template PR| T3 | 🟣 Violet | `#9C27B0` |

└── 🎨 custom-styles/               # Styles personnalisés

```| T4 | 🔴 Rouge | `#F44336` ||--------|------------------|--------------|- **🎨 Coloration des Threads** : Sortie multi-thread avec identification visuelle par couleur pour chaque thread



### 🧩 Architecture Technique| T5 | 🟤 Marron | `#795548` |



#### 🎯 Moteur BrainfuckInterpreter.js| T6 | 🔘 Bleu-gris | `#607D8B` || **Parent** | PID enfant (> 0) | Continue avec l'ID du nouvel enfant |- **📝 Légende Interactive** : Affichage d'une légende colorée pour identifier les threads en mode multi-thread

- **🏗️ Architecture** : 100% instance-based (0 méthode statique)

- **📊 Métriques** : 485 lignes optimisées (-14% vs v1.3.0)| T7 | 🩷 Rose | `#E91E63` |

- **🔄 Threading** : Round-robin scheduling équitable

- **🛡️ Sécurité** : Isolation mémoire + protection fork bomb| **Enfant** | 0 | Nouveau thread avec valeur zéro |- **⚡ Capture Temps Réel** : Système de capture des sorties en temps réel pendant l'exécution

- **🚀 Performance** : Zero memory leaks, error isolation

## 📋 Commandes Brainfuck

#### 🎨 Interface index.html

- **📱 Responsive** : Design adaptatif multi-écrans- **📊 Cache Persistant** : Système de cache pour préserver les sorties des threads même après nettoyage

- **🎮 Interactive** : Contrôles intuitifs pas-à-pas/complet

- **👁️ Visualisation** : État mémoire temps réel| Cmd | Action | Multithreading |

- **🎨 Coloration** : Éditeur syntaxique avec support `f`

- **📊 Cache** : Système persistant cross-execution|-----|--------|----------------|### Exemples- **📊 Cache Persistant** : Système de cache pour préserver les sorties des threads même après nettoyage



#### 📚 Système de Documentation| `>` | Avancer pointeur | ✅ Par thread |

- **📋 API Reference** : Documentation complète des méthodes

- **📖 Exemples** : Tutoriels progressifs avec explications| `<` | Reculer pointeur | ✅ Par thread |- **🎁 Interface Unifiée** : Sortie globale unifiée fonctionnant à la fois en mode pas-à-pas et exécution complète

- **🧪 Tests** : Guides de validation Unix-style

- **📝 Changelog** : Traçabilité complète des versions| `+` | Incrémenter | ✅ Par thread |



---| `-` | Décrémenter | ✅ Par thread |#### Fork Simple



## 🎓 Guide Pédagogique| `.` | Sortie | ✅ Par thread |



### 🧠 Comprendre le Fork Unix-Style| `,` | Entrée | ✅ Par thread |```brainfuck-----



#### Métaphore : Le Manager et l'Employé| `[` | Début boucle | ✅ Par thread |

```

Manager (Thread Parent)| `]` | Fin boucle | ✅ Par thread |f.    # Parent affiche PID, enfant affiche 0

       ↓

   [Délègue f]| **`f`** | **Fork** | ✅ **Nouveau !** |

      ↙    ↘

Manager     Employé```## 🏗️ Architecture Technique

(ID=1)      (ID=0)

```## 🏗️ Architecture



- **Manager (parent)** : Reçoit l'ID de l'employé (>0) pour suivi

- **Employé (enfant)** : Reçoit 0, sait qu'il est l'exécutant

- **Autonomie** : Chacun peut suivre un chemin différent### Structure du Projet



#### Exemple Détaillé : `f[+++.]````#### Exécution Conditionnelle### 📦 **Structure Modulaire**



**Étape 1 - Fork** :brainfuck/

- T0 crée T1 → T0 reçoit PID=1, T1 reçoit 0

├── index.html                 # Interface utilisateur principale```brainfuck- **`BrainfuckInterpreter.js`** : Moteur d'interprétation avec gestion des threads (486 lignes)

**Étape 2 - Test condition `[...]`** :

- T0 : cellule=1 (≠0) → **entre** dans la boucle├── BrainfuckInterpreter.js    # Moteur d'interprétation (486 lignes)

- T1 : cellule=0 (=0) → **saute** la boucle

├── package.json               # Configuration NPMf[+++.]   # Seul le parent (PID>0) exécute +++.- **`index.html`** : Interface utilisateur interactive avec visualisation temps réel

**Étape 3 - Exécution** :

- T0 : exécute `+++.` → affiche caractère ASCII 4├── docs/                      # Documentation

- T1 : programme terminé → aucun affichage

│   ├── API.md                # Documentation API```- **`package.json`** : Configuration du projet et scripts de build

**Résultat** : Seul le parent affiche quelque chose

│   ├── EXAMPLES.md           # Exemples et tutoriels

### 🎯 Cas d'Usage Avancés

│   └── test-unix-fork.md     # Guide tests Unix-style- **Documentation complète** : README, guides de test, et documentation API

#### 1. Parallélisme Simple

```brainfuck├── scripts/                   # Scripts de déploiement

++f>++.    # Parent et enfant affichent caractère différent

```└── .github/                   # Templates GitHub#### ⚠️ Fork Bomb (Éviter !)



#### 2. Division du Travail```

```brainfuck

f[>+++++++++.][<+++++++++.]    # Parent à droite, enfant à gauche```brainfuck### ⚙️ **Système de Threading**

```

### Système de Threading

#### 3. Chaîne de Production

```brainfuck- **Instance-Based** : Chaque interpréteur gère ses threadsf[f]      # Création récursive de threads- **Instance-Based Management** : Chaque interpréteur gère ses propres threads

+f[f[f[.]]]    # Arbre de 4 threads avec délégation

```- **Round-Robin** : Exécution équitable (T0 → T1 → T2...)



---- **Isolation** : 30k cellules par thread, mémoire indépendante```- **Thread Isolation** : Mémoire indépendante pour chaque thread (30 000 cellules × 8 threads max)



## 🔧 Interface Utilisateur- **Auto-cleanup** : Suppression automatique des threads terminés



### 🎮 Modes de Fonctionnement- **Protection** : Limite de 8 threads simultanés**Protection** : Limite de 8 threads simultanés par défaut.- **Round-Robin Scheduling** : Exécution équitable en ordre de création (T0, T1, T2...)



#### 📱 Mode Single-Thread (Défaut)

- **Vue détaillée** : État complet mémoire/pointeurs

- **Debug précis** : Cellule par cellule## 🎓 Guide Pédagogique- **Automatic Cleanup** : Suppression automatique des threads terminés

- **Apprentissage** : Idéal pour comprendre Brainfuck



#### 🌐 Mode Multi-Thread (Auto-switch)

- **Déclenchement** : Automatique au premier `f`### Comprendre le Fork Unix-Style## ✨ Fonctionnalités- **Fork Bomb Protection** : Limite configurable (défaut: 8 threads simultanés)

- **Vue globale** : Tous threads avec couleurs

- **Production** : Exécution parallèle optimisée



### 🎨 Contrôles DisponiblesLe fork **duplique** le thread actuel. Contrairement à d'autres implémentations, notre version suit la sémantique Unix :



| Bouton | Fonction | Mode |

|--------|----------|------|

| **▶️ Exécuter** | Lance programme complet | Tous |```- **🔀 Multithreading** : Commande `f` pour créer des threads parallèles### 🔧 **Optimisations v1.3.1**

| **👣 Step** | Une instruction (thread actuel) | Single |

| **⚡ Step All** | Une instruction (tous threads) | Multi |Thread Parent (T0)

| **🔄 Reset** | Remet à zéro (préserve cache) | Tous |

| **🗑️ Clear** | Vide cache de sortie | Tous |       ↓- **👁️ Visualisation** : Interface dédiée multi-thread avec identification par couleur- **Zero Static Methods** : Architecture 100% orientée instance

| **👁️ Toggle** | Bascule vue détaillée/simple | Tous |

   [Fork f]

### 📊 Visualisations

      ↙ ↘- **⚡ Exécution** : Mode pas à pas ou exécution complète- **Efficient Thread Detection** : `hasMultipleActiveThreads()` avec early-exit

#### 🧠 État Mémoire

- **Cellules visibles** : 20 cellules autour du pointeur  T0 (PID=1)  T1 (0)

- **Highlighting** : Cellule active en surbrillance

- **Valeurs** : Décimal et hexadécimal    Parent     Enfant- **🎨 Éditeur** : Coloration syntaxique avec support de `f`- **Error Resilience** : Isolation des erreurs par thread

- **Navigation** : Auto-scroll avec le pointeur

```

#### 🎯 Suivi Threads

- **Liste active** : Tous threads avec statut- **🛡️ Sécurité** : Protection contre les fork bombs- **Memory Optimization** : Réduction de 14% de la taille du code

- **Couleur code** : Identification visuelle immédiate

- **Statistiques** : Forks créés, instructions exécutées### Métaphore : Le Superviseur

- **État temps réel** : ACTIVE/HALTED/WAITING

- **Superviseur (parent)** : Reçoit l'ID de l'ouvrier qu'il délègue- **📊 Debug** : Messages console détaillés- **Performance Gains** : Suppression des appels de méthodes obsolètes

---

- **Ouvrier (enfant)** : Reçoit 0, sait qu'il est l'exécutant

## 📊 Métriques et Performance

- **Division du travail** : Chacun peut faire des tâches différentes

### 🚀 Version 1.5.0 - Statistiques



| Métrique | Valeur | Amélioration |

|----------|--------|-------------|### Exemple Détaillé : `f[+++.]`### Identification Visuelle des Threads-----

| **Lignes Code Core** | 485 | -14% vs v1.3.0 |

| **Méthodes Statiques** | 0 | -100% (5→0) |

| **Architecture** | 100% Instance | +100% cohérence |

| **Warnings** | 0 | Zéro problème |1. **Fork** : T0 crée T1

| **Threads Max** | 8 | Protection garantie |

| **Mémoire/Thread** | 30K cellules | Isolation complète |   - T0 reçoit PID=1, T1 reçoit 0

| **Performance** | O(1) scheduling | Round-robin optimal |

2. **Test boucle** : `[...]`| Thread | Couleur | Code |## ✨ Fonctionnalités Clés

### 📈 Évolution du Projet

   - T0 : 1≠0 → entre dans la boucle

| Version | Date | Fonctionnalité Majeure |

|---------|------|------------------------|   - T1 : 0=0 → saute la boucle|--------|---------|------|

| **1.0.x** | 2025-09 | Brainfuck standard |

| **1.2.x** | 2025-09 | Multithreading basique |3. **Résultat** : Seul T0 affiche quelque chose

| **1.3.0** | 2025-09 | Interface multi-thread |

| **1.3.1** | 2025-10 | Architecture optimisée || T0 | 🔵 Bleu | `#2196F3` |*   **Séparation des responsabilités** : Le moteur Brainfuck est isolé dans **`BrainfuckInterpreter.js`**.

| **1.5.0** | 2025-10 | **Fork Unix-style** |

## 🔧 Interface Utilisateur

### 🎯 Compatibilité

| T1 | 🟢 Vert | `#4CAF50` |*   **� Multithreading avec Fork** : Nouvelle commande `f` qui permet la création de threads parallèles.

✅ **Navigateurs** : Chrome 80+, Firefox 75+, Safari 13+, Edge 80+  

✅ **Systèmes** : Windows, macOS, Linux  ### Modes d'Affichage

✅ **Mobile** : iOS Safari, Android Chrome  

✅ **Standards** : ES6+, HTML5, CSS3  - **Single-thread** : Vue classique avec état détaillé| T2 | 🟠 Orange | `#FF9800` |*   **Éditeur avec Coloration Syntaxique** : Un éditeur de code personnalisé qui colore les commandes Brainfuck (y compris `f`).



---- **Multi-thread** : Bascule automatique dès le premier fork



## 🧪 Exemples et Tests- **Sortie unifiée** : Tous les threads dans une zone commune avec couleurs| T3+ | ... | Jusqu'à 8 couleurs |*   **Visualisation Multi-Thread** : Interface dédiée pour suivre l'état de tous les threads actifs.



### 🔰 Tests Basiques



```brainfuck### Contrôles*   **🛡️ Protection Fork Bomb** : Limite globale configurable du nombre de threads pour éviter les explosions.

# Test 1: Sortie simple

+++.           # Affiche caractère ASCII 3- **▶️ Exécuter** : Lance le programme complet



# Test 2: Fork identification- **👣 Step** : Exécution pas à pas (un ou tous threads)## 📋 Commandes Brainfuck*   **Exécution Pas à Pas (Step-by-Step)** : Exécute une seule instruction à la fois, idéale pour le débogage et la pédagogie.

f.             # Parent: 0x01, Enfant: 0x00

- **🔄 Reset** : Remet à zéro

# Test 3: Exécution conditionnelle

f[+++.]        # Seul parent affiche ASCII 3- **👁️ Vue détaillée** : Basculer entre modes d'affichage*   **Exécution Complète Multi-Thread** : Exécute tous les threads jusqu'à completion.

```



### 🚀 Tests Avancés

### Cache Persistant| Cmd | Action | Multithreading |*   **Gestion des Entrées/Sorties** : Zones de texte dédiées pour fournir des données d'entrée et visualiser la sortie.

```brainfuck

# Test 4: Fork multiple- **📊 Préservation** : Sortie sauvegardée même après reset

++f>++f.       # 3 threads avec positions différentes

- **🎨 Couleurs** : Identification des threads maintenue|-----|--------|----------------|*   **Visualisation de l'État en Temps Réel** avec support multi-thread.

# Test 5: Arbre de forks

+f[f[.]]       # Arbre: T0→T1→T2, seul T2 affiche- **🔄 Gestion** : Clear manuel pour vider le cache



# Test 6: Communication parent-enfant| `>` | Avancer pointeur | ✅ Par thread |

+++f[>+++.<]   # Parent modifie, enfant utilise

```## 📊 Métriques v1.5.0



### ⚠️ Tests de Sécurité| `<` | Reculer pointeur | ✅ Par thread |-----



```brainfuck- **Architecture** : 100% instance-based, 0 méthode statique

# Fork bomb basique (protégé)

f[f]           # Limité à 8 threads max- **Performance** : 486 lignes optimisées (-14% vs v1.3.0)| `+` | Incrémenter | ✅ Par thread |



# Fork bomb avec boucle (protégé)  - **Compatibilité** : Chrome, Firefox, Safari, Edge

+[f+]          # Protection active après 8 threads

- **Documentation** : README, API, exemples, tests| `-` | Décrémenter | ✅ Par thread |## 🎨 Identification Visuelle des Threads

# Stress test mémoire

+++++[>++++[>++[f]<]<]    # Test limites système- **Qualité** : 0 warning, tests complets

```

| `.` | Sortie | ✅ Par thread |

---

## 🧪 Exemples de Test

## 🛠️ Développement

| `,` | Entrée | ✅ Par thread |### Coloration Automatique

### 📦 Scripts NPM

### Tests Basiques

```bash

# Gestion des versions```brainfuck| `[` | Début boucle | ✅ Par thread |Chaque thread possède sa propre couleur pour faciliter l'identification visuelle :

npm run version:patch    # 1.5.0 → 1.5.1

npm run version:minor    # 1.5.0 → 1.6.0  +++.           # Sortie simple

npm run version:major    # 1.5.0 → 2.0.0

+++f.          # Fork simple : parent et enfant affichent| `]` | Fin boucle | ✅ Par thread |

# Build et mise à jour

npm run build           # Met à jour version dans fichiersf[+++.]        # Fork conditionnel : seul parent affiche

```

```| **`f`** | **Fork** | ✅ **Nouveau !** || Thread | Couleur | Code Hex |

### 🚀 Déploiement



```bash

# Unix/Linux/macOS### Tests Avancés|--------|---------|----------|

chmod +x scripts/deploy.sh

./scripts/deploy.sh```brainfuck



# Windows PowerShell++f>++f.       # Multiple forks avec déplacement## 🏗️ Architecture| **T0** | 🔵 Bleu | `#2196F3` |

.\scripts\deploy.bat

+++[f+]        # Attention : fork bomb potentiel !

# Manuel

git add .```| **T1** | 🟢 Vert | `#4CAF50` |

git commit -m "feat: nouvelle fonctionnalité"

git push origin main

```

## 🛠️ Développement### Structure du Projet| **T2** | 🟠 Orange | `#FF9800` |

### 🐛 Debug et Logs



**Console Browser (F12)** - Messages détaillés :

```javascript### Versioning```| **T3** | 🟣 Violet | `#9C27B0` |

🔍 Thread T0 tente un fork Unix-style (forks créés: 0)

✅ Fork réussi: T0 → T1 (parent reçoit PID=1, enfant=0)```bash

🎯 Scheduling: T0 → T1 → T0 (round-robin)

⚠️ Protection fork bomb: 8/8 threads actifsnpm run version:patch   # 1.5.0 → 1.5.1brainfuck/| **T4** | 🔴 Rouge | `#F44336` |

```

npm run version:minor   # 1.5.0 → 1.6.0

---

npm run version:major   # 1.5.0 → 2.0.0├── index.html                 # Interface utilisateur principale| **T5** | 🟤 Marron | `#795548` |

## 📚 Ressources

```

### 📖 Documentation Complète

├── BrainfuckInterpreter.js    # Moteur d'interprétation (486 lignes)| **T6** | 🔘 Bleu-gris | `#607D8B` |

- **[📋 API Reference](docs/API.md)** - Documentation technique complète

- **[📚 Guide Examples](docs/EXAMPLES.md)** - Tutoriels et cas d'usage### Déploiement

- **[🧪 Tests Unix-Fork](docs/test-unix-fork.md)** - Guide validation comportement

```bash├── package.json               # Configuration NPM| **T7** | 🩷 Rose | `#E91E63` |

### 🔗 Liens Utiles

# Unix/Linux/Mac

- **[🌐 Démo Live](https://vfarcy.github.io/brainfuck/)** - Version en ligne

- **[📝 Changelog](CHANGELOG.md)** - Historique des versions  ./scripts/deploy.sh├── docs/                      # Documentation

- **[🐙 Repository](https://github.com/vfarcy/brainfuck)** - Code source

- **[📄 Issues](https://github.com/vfarcy/brainfuck/issues)** - Bug reports & feature requests



### 🎓 Références Techniques# Windows│   ├── API.md                # Documentation API### Affichage dans l'Interface



- **[Brainfuck Language](https://en.wikipedia.org/wiki/Brainfuck)** - Spécification officiellescripts\deploy.bat

- **[Unix Fork](https://man7.org/linux/man-pages/man2/fork.2.html)** - Documentation POSIX

- **[JavaScript Threading](https://developer.mozilla.org/docs/Web/API/Web_Workers_API)** - Concepts avancés```│   ├── EXAMPLES.md           # Exemples et tutoriels- **Sortie Globale** : Chaque caractère affiché porte la couleur de son thread d'origine



---



## 🤝 Contribution### Debug│   └── test-unix-fork.md     # Guide tests Unix-style- **Caractères Hexadécimaux** : Les caractères non-imprimables (ex: `0x01`) héritent de la couleur de leur thread



### 🔄 Workflow GitHubOuvrir la console développeur (F12) pour voir les messages détaillés d'exécution des threads.



1. **Fork** le projet depuis GitHub├── scripts/                   # Scripts de déploiement- **Légende Interactive** : Une légende colorée s'affiche automatiquement en mode multi-thread

2. **Clone** votre fork localement

   ```bash## 📚 Documentation

   git clone https://github.com/VOTRE-USERNAME/brainfuck.git

   ```└── .github/                   # Templates GitHub- **Séparateurs Visuels** : Un séparateur `|` gris sépare les sorties de différents threads

3. **Créer** une branche feature

   ```bash- **[API.md](docs/API.md)** : Documentation complète de l'API

   git checkout -b feature/nom-fonctionnalite

   ```- **[EXAMPLES.md](docs/EXAMPLES.md)** : Exemples et tutoriels```

4. **Développer** avec commits sémantiques

   ```bash- **[test-unix-fork.md](docs/test-unix-fork.md)** : Guide des tests Unix-style

   git commit -m "feat: ajout support Unicode"

   git commit -m "fix: correction bug thread cleanup"-----

   ```

5. **Pousser** et créer une Pull Request## 🤝 Contribution

   ```bash

   git push origin feature/nom-fonctionnalite### Système de Threading

   ```

1. Fork le projet

### 📋 Templates Disponibles

2. Créer une branche feature (`git checkout -b feature/nom`)- **Instance-Based** : Chaque interpréteur gère ses threads## 🔀 Nouvelle Commande: Fork (`f`) - Style Unix

- **[🐛 Issue Template](.github/ISSUE_TEMPLATE.md)** - Rapport de bug structuré

- **[🔄 PR Template](.github/PULL_REQUEST_TEMPLATE.md)** - Pull request guidée3. Committer les changements (`git commit -m "feat: description"`)



### 🎯 Guidelines4. Pousser la branche (`git push origin feature/nom`)- **Round-Robin** : Exécution équitable (T0 → T1 → T2...)



- **Code Style** : ES6+, 4 espaces, JSDoc complet5. Ouvrir une Pull Request

- **Tests** : Validation dans console browser

- **Documentation** : Markdown avec émojis et exemples- **Isolation** : 30k cellules par thread, mémoire indépendante### Comportement de `f` (Unix-Style Fork) 🆕 v1.5.0

- **Commits** : Convention [Semantic Commits](https://www.conventionalcommits.org/)

Consultez les [templates GitHub](.github/) pour les issues et PR.

---

- **Auto-cleanup** : Suppression automatique des threads terminésQuand la commande `f` est rencontrée, le thread actuel **fork** selon la sémantique Unix authentique :

## 📜 Licence et Crédits

## 📜 Licence

### 📄 Licence MIT



```

MIT LicenseMIT License - voir [LICENSE](LICENSE)



Copyright (c) 2025 Valéry Farcy## 🎓 Guide Pédagogique| Thread | Valeur Retournée | Description |



Permission is hereby granted, free of charge, to any person obtaining a copy**Auteur :** [Valéry Farcy](https://github.com/vfarcy)

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights|--------|------------------|-------------|

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is---

furnished to do so, subject to the following conditions:

### Comprendre le Fork Unix-Style| **Parent** | **PID de l'enfant** (valeur > 0) | Reçoit l'identifiant du thread enfant créé |

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.*BrainJS v1.5.0 - Interpréteur Brainfuck avec Multithreading Unix-Style authentique* 🚀

| **Enfant** | **0** | Reçoit zéro pour indiquer qu'il est le processus enfant |

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,Le fork **duplique** le thread actuel. Contrairement à d'autres implémentations, notre version suit la sémantique Unix :| **Erreur** | **-1** | En cas d'échec (non implémenté dans cette version) |

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE```### Avantages du Fork Unix-Style

SOFTWARE.

```Thread Parent (T0)



### 👨‍💻 Auteur       ↓✅ **Exécution Conditionnelle** : Permet aux threads parent et enfant d'exécuter du code différent  



**[Valéry Farcy](https://github.com/vfarcy)**   [Fork f]✅ **Compatibilité Unix** : Sémantique familière aux développeurs systèmes  

- 🌐 GitHub: [@vfarcy](https://github.com/vfarcy)

- 📧 Email: Disponible sur le profil GitHub      ↙ ↘✅ **Flexibilité** : Utilisation de boucles `[...]` pour distinguer parent (`PID > 0`) et enfant (`0`)  

- 🎯 Spécialité: Langages ésotériques, multithreading, interfaces interactives

  T0 (PID=1)  T1 (0)✅ **Authentique** : Respecte les conventions POSIX  

### 🙏 Remerciements

    Parent     Enfant

- **Urban Müller** - Créateur original du langage Brainfuck (1993)

- **Communauté Open Source** - Contributions et retours d'expérience```### Exemples

- **POSIX Standard** - Inspiration pour la sémantique fork authentique



---

### Métaphore : Le Superviseur#### Exemple Simple : Identification Parent/Enfant

## 🔮 Roadmap

- **Superviseur (parent)** : Reçoit l'ID de l'ouvrier qu'il délègue```brainfuck

### 🎯 Version 1.6.0 (Q4 2025)

- 🧪 **Tests automatisés** : Jest/Mocha avec CI/CD- **Ouvrier (enfant)** : Reçoit 0, sait qu'il est l'exécutantf         # Fork: Parent reçoit PID enfant, Enfant reçoit 0

- 🌍 **Internationalisation** : Interface multi-langues

- 📱 **Progressive Web App** : Support offline et mobile- **Division du travail** : Chacun peut faire des tâches différentes[         # Si valeur > 0 (parent)

- 🔧 **API REST** : Endpoints pour intégration externe

  +++.    # Afficher caractère pour parent

### 🚀 Version 2.0.0 (2026)

- 📘 **TypeScript** : Réécriture complète typée### Exemple Détaillé : `f[+++.]`]

- ⚡ **WebAssembly** : Moteur haute performance

- 🔌 **Plugin System** : Extensions communautaires# Code commun aux deux processus

- 🎮 **IDE Mode** : Debugger avancé avec breakpoints

1. **Fork** : T0 crée T1```

### 💡 Idées Futures

- 🤖 **Intelligence Artificielle** : Assistant code Brainfuck   - T0 reçoit PID=1, T1 reçoit 0

- 🌐 **Cloud Execution** : Exécution distribuée

- 📊 **Analytics** : Métriques d'usage et performance2. **Test boucle** : `[...]`#### Exemple Avancé : Exécution Conditionnelle

- 🎨 **Visual Programming** : Interface drag & drop

   - T0 : 1≠0 → entre dans la boucle```brainfuck

---

   - T1 : 0=0 → saute la bouclef[>+<-]   # Fork et copier PID dans cellule suivante

<div align="center">

3. **Résultat** : Seul T0 affiche quelque chose>         # Aller à la copie du PID

**🧠 BrainJS v1.5.0**  

*Interpréteur Brainfuck avec Multithreading Unix-Style Authentique*[         # Si PID > 0 (processus parent)



[![GitHub Stars](https://img.shields.io/github/stars/vfarcy/brainfuck?style=social)](https://github.com/vfarcy/brainfuck/stargazers)## 🔧 Interface Utilisateur  <       # Retour à la cellule originale

[![GitHub Forks](https://img.shields.io/github/forks/vfarcy/brainfuck?style=social)](https://github.com/vfarcy/brainfuck/network/members)

  +++.    # Code spécifique au parent

**[🌐 Démo Live](https://vfarcy.github.io/brainfuck/) | [📚 Documentation](docs/) | [🐙 GitHub](https://github.com/vfarcy/brainfuck) | [📄 Licence](LICENSE)**

### Modes d'Affichage  >[-]    # Nettoyer et sortir de la boucle

*Développé avec ❤️ par [Valéry Farcy](https://github.com/vfarcy) • 2025*

- **Single-thread** : Vue classique avec état détaillé]

</div>
- **Multi-thread** : Bascule automatique dès le premier fork<         # Retour à la cellule originale

- **Sortie unifiée** : Tous les threads dans une zone commune avec couleurs[         # Si valeur = 0 (processus enfant)

  ++.     # Code spécifique à l'enfant

### Contrôles  [-]     # Nettoyer pour sortir

- **▶️ Exécuter** : Lance le programme complet]

- **👣 Step** : Exécution pas à pas (un ou tous threads)```

- **🔄 Reset** : Remet à zéro

- **👁️ Vue détaillée** : Basculer entre modes d'affichage#### ⚠️ Exemple Dangereux (Fork Bomb)

```brainfuck

## 📊 Métriques v1.5.0f[f]      # Fork récursif

```

- **Architecture** : 100% instance-based, 0 méthode statique**Attention !** Chaque parent crée continuellement de nouveaux enfants.

- **Performance** : 486 lignes optimisées (-14% vs v1.3.0)

- **Compatibilité** : Chrome, Firefox, Safari, Edge**Protection :** Une limite globale de 8 threads actifs par défaut empêche les fork bombs. Plus simple et efficace qu'une double protection.

- **Documentation** : README, API, exemples, tests

- **Qualité** : 0 warning, tests complets-----



## 🧪 Exemples de Test## 📊 **Métriques de Performance & Qualité**



### Tests Basiques### 🎯 **Optimisations v1.3.1**

```brainfuck| Métrique | Avant (v1.3.0) | Après (v1.3.1) | Amélioration |

+++.           # Sortie simple|----------|------------------|-----------------|--------------|

+++f.          # Fork simple : parent et enfant affichent| **Lignes de code** | 566 lignes | 486 lignes | **-14%** |

f[+++.]        # Fork conditionnel : seul parent affiche| **Méthodes statiques** | 5 obsolètes | 0 | **-100%** |

```| **Architecture** | Hybride | 100% Instance | **✅ Cohérent** |

| **Warnings** | 5 deprecation | 0 | **✅ Clean** |

### Tests Avancés| **Memory leaks** | 0 | 0 | **✅ Stable** |

```brainfuck

++f>++f.       # Multiple forks avec déplacement### ⚡ **Fonctionnalités Avancées**

+++[f+]        # Attention : fork bomb potentiel !- **🔍 Step Debugging** : Exécution pas à pas avec support multi-thread

```- **🎨 Visual Threading** : 8 couleurs distinctes pour identifier les threads

- **📈 Real-time Metrics** : Compteurs d'étapes et statistiques d'exécution

## 🛠️ Développement- **🛡️ Error Isolation** : Crash d'un thread n'affecte pas les autres

- **🧹 Smart Cleanup** : Garbage collection automatique des threads terminés

### Versioning

```bash### 🏆 **Compatibilité & Standards**

npm run version:patch   # 1.5.0 → 1.5.1- **ES6+ Modern JavaScript** : Classes, const/let, template literals

npm run version:minor   # 1.5.0 → 1.6.0- **Cross-browser Support** : Chrome, Firefox, Safari, Edge

npm run version:major   # 1.5.0 → 2.0.0- **Mobile Responsive** : Interface adaptative pour tablettes/mobiles

```- **Accessibility** : Labels ARIA, contraste respecté, navigation clavier



### Déploiement-----

```bash

# Unix/Linux/Mac# 🎓 **Comprendre le Fork en Brainfuck - Guide Pédagogique**

./scripts/deploy.sh

## 📚 **Qu'est-ce qu'un Fork ?**

# Windows

scripts\deploy.batLe **fork** est une instruction spéciale (représentée par `f`) qui permet de **dupliquer** un thread en cours d'exécution. C'est comme si le programme se "clonait" à un moment précis.

```

## 🧬 **Métaphore : La Photocopieuse**

### Debug

Ouvrir la console développeur (F12) pour voir les messages détaillés d'exécution des threads.Imaginez que votre programme soit une **recette de cuisine** et chaque thread soit un **cuisinier** :



## 📚 Documentation```

📋 Recette : "f,f."

- **[API.md](docs/API.md)** : Documentation complète de l'API🧑‍🍳 Cuisinier T0 commence à lire la recette...

- **[EXAMPLES.md](docs/EXAMPLES.md)** : Exemples et tutoriels```

- **[test-unix-fork.md](docs/test-unix-fork.md)** : Guide des tests Unix-style

### **Étape 1 : Le Premier 'f' (Position 0)**

## 🤝 Contribution```

📋 Recette : [f] , f .

1. Fork le projet🧑‍🍳 T0 lit : "Dupliquez-vous !"

2. Créer une branche feature (`git checkout -b feature/nom`)```

3. Committer les changements (`git commit -m "feat: description"`)

4. Pousser la branche (`git push origin feature/nom`)**Résultat :** T0 se duplique → Un deuxième cuisinier T1 apparaît !

5. Ouvrir une Pull Request

```

Consultez les [templates GitHub](.github/) pour les issues et PR.🧑‍🍳 T0 : f [,] f .  ← Continue à la position suivante

👨‍🍳 T1 : [f] , f .  ← Commence au début de la recette !

## 📜 Licence```



MIT License - voir [LICENSE](LICENSE)## 🔄 **Principe Fondamental : "Unix-Style Fork"**



**Auteur :** [Valéry Farcy](https://github.com/vfarcy)### **⚠️ Point Crucial :**

Quand un thread est créé par fork Unix-style, le **parent reçoit le PID de l'enfant** dans la cellule courante, l'**enfant reçoit 0**. Les deux threads continuent après le fork avec des valeurs différentes permettant l'exécution conditionnelle.

---

## 📖 **Exemple Détaillé : Code Unix-Style `f[+++.]`**

*BrainJS v1.5.0 - Interpréteur Brainfuck avec Multithreading Unix-Style authentique* 🚀
### **Positions du Code :**
```
Position:  0   1   2   3   4   5   6
Code:      f   [   +   +   +   .   ]
           ↑   ↑   ↑   ↑   ↑   ↑   ↑
        Fork Boucle Inc Inc Inc Sortie Fin
```

### **Exécution Chronologique Unix-Style :**

#### **🕐 Temps 1 : Début**
```
T0: [f] [ + + + . ]  ← Position 0
```
- T0 exécute le fork → Crée T1
- **T0 (parent)** : reçoit PID=1 dans cellule[0], avance position 1
- **T1 (enfant)** : reçoit 0 dans cellule[0], avance position 1

#### **🕑 Temps 2 : Évaluation de la boucle**
```
T0: f [[] + + + . ]  ← Position 1, cellule[0]=1 (PID)
T1: f [[] + + + . ]  ← Position 1, cellule[0]=0 (enfant)
```
- **T0** : cellule[0]=1 ≠ 0 → **entre dans la boucle** (position 2)
- **T1** : cellule[0]=0 = 0 → **saute après `]`** (position 7, fin de programme)

#### **🕒 Temps 3 : Exécution divergente**
```
T0: f [ [+] + + . ]  ← Position 2, exécute +++.
T1: TERMINÉ         ← Position 7, thread halted
```
- **T0** : exécute `+++.` → cellule[0] devient 4 → affiche 0x04
- **T1** : terminé, aucune sortie
```
T0: Cellule[0]=4, affiche 0x04
T1: Terminé, aucune sortie
```

**Résultat Unix-Style : Un seul thread produit une sortie conditionnelle !**

## 🎯 **Pourquoi le Comportement Unix-Style ?**

### **Avantages du Fork Unix-Style :**

1. **🔍 Authentique POSIX**
   - Comportement identique aux systèmes Unix réels
   - Standard **industrie** reconnu

2. **👀 Exécution Conditionnelle**
   - Parent et enfant peuvent suivre des **chemins différents**
   - Permet la **division du travail** authentique

3. **🛡️ Contrôle Granulaire**
   - Utilisation des boucles `[...]` pour différencier parent/enfant
   - **Flexibilité maximale** dans la programmation

4. **📊 Réalisme Systémique**
   - Modèle fidèle aux **vrais processus Unix**
   - Apprentissage des **concepts système** authentiques

## 🧪 **Exemples Pratiques Unix-Style**

### **Exemple 1 : Fork Simple**
```brainfuck
f.
```
**Résultat Unix-Style :**
- **Parent (T0)** : Reçoit PID=1 → affiche 0x01
- **Enfant (T1)** : Reçoit 0 → affiche 0x00  
- **Sortie :** `0x01|0x00` (PID parent|zéro enfant)

### **Exemple 2 : Fork Unix-Style Simple**
```brainfuck
+++f.
```
**Résultat :**
- T0 (parent) : cellule=3 → fork → reçoit PID=1 → affiche 0x01
- T1 (enfant) : cellule=3 → fork → reçoit 0 → affiche 0x00
- **Sortie :** `0x01|0x00` (PID parent|zéro enfant)

### **Exemple 3 : Fork avec Exécution Conditionnelle**
```brainfuck
f[+++.]
```
**Résultat :**
- T0 (parent) : fork → reçoit PID=1 → entre dans boucle [1≠0] → affiche 0x04
- T1 (enfant) : fork → reçoit 0 → saute la boucle [0=0] → aucune sortie
- **Sortie :** `0x04` (seul le parent exécute)

-----

### 📚 **Documentation Professionnelle**
- **� docs/test-unix-fork.md** : Guide complet des tests Unix-style en format Markdown
- **📖 Documentation Structurée** : Organisation professionnelle dans le répertoire docs/
- **� Exemples Interactifs** : Tests détaillés avec explications techniques
- **📊 Concepts Avancés** : Patterns de programmation et applications pratiques

-----

## 🔧 Historique v1.3.1

### 🚀 **Architecture Optimisée**
- **🗑️ Méthodes Statiques Supprimées** : Élimination définitive de toutes les méthodes statiques obsolètes
- **🏗️ 100% Instance-Based** : Architecture entièrement basée sur les instances pour une meilleure encapsulation
- **⚡ Performance Améliorée** : Réduction de 14% de la taille du code (486 vs 566 lignes)
- **🧹 Code Plus Propre** : Suppression de 80 lignes de code obsolète

### 🔧 **Améliorations Techniques**
- **✅ Exécution Pas à Pas Corrigée** : Fonctionnement parfait avec les threads multiples
- **🎯 Détection Threads Optimisée** : Nouvelle méthode `hasMultipleActiveThreads()` plus efficace
- **🛡️ Gestion d'Erreurs Renforcée** : Try-catch autour de chaque exécution de thread
- **📊 Debugging Amélioré** : Messages de log structurés et informatifs

### 🎨 **Interface Utilisateur**
- **🎨 Coloration des Threads** : Sortie multi-thread avec identification visuelle par couleur pour chaque thread
- **📝 Légende Interactive** : Affichage d'une légende colorée pour identifier les threads en mode multi-thread
- **⚡ Capture Temps Réel** : Système de capture des sorties en temps réel pendant l'exécution
- **📊 Cache Persistant** : Système de cache pour préserver les sorties des threads même après nettoyage
- **📊 Cache Persistant** : Système de cache pour préserver les sorties des threads même après nettoyage
- **🎁 Interface Unifiée** : Sortie globale unifiée fonctionnant à la fois en mode pas-à-pas et exécution complète

-----

## 🏗️ Architecture Technique

### 📦 **Structure Modulaire**
- **`BrainfuckInterpreter.js`** : Moteur d'interprétation avec gestion des threads (486 lignes)
- **`index.html`** : Interface utilisateur interactive avec visualisation temps réel
- **`package.json`** : Configuration du projet et scripts de build
- **Documentation complète** : README, guides de test, et documentation API

### ⚙️ **Système de Threading**
- **Instance-Based Management** : Chaque interpréteur gère ses propres threads
- **Thread Isolation** : Mémoire indépendante pour chaque thread (30 000 cellules × 8 threads max)
- **Round-Robin Scheduling** : Exécution équitable en ordre de création (T0, T1, T2...)
- **Automatic Cleanup** : Suppression automatique des threads terminés
- **Fork Bomb Protection** : Limite configurable (défaut: 8 threads simultanés)

### 🔧 **Optimisations v1.3.1**
- **Zero Static Methods** : Architecture 100% orientée instance
- **Efficient Thread Detection** : `hasMultipleActiveThreads()` avec early-exit
- **Error Resilience** : Isolation des erreurs par thread
- **Memory Optimization** : Réduction de 14% de la taille du code
- **Performance Gains** : Suppression des appels de méthodes obsolètes

-----

## ✨ Fonctionnalités Clés

*   **Séparation des responsabilités** : Le moteur Brainfuck est isolé dans **`BrainfuckInterpreter.js`**.
*   **🔀 Multithreading avec Fork** : Nouvelle commande `f` qui permet la création de threads parallèles.
*   **Éditeur avec Coloration Syntaxique** : Un éditeur de code personnalisé qui colore les commandes Brainfuck (y compris `f`).
*   **Visualisation Multi-Thread** : Interface dédiée pour suivre l'état de tous les threads actifs.
*   **🛡️ Protection Fork Bomb** : Limite globale configurable du nombre de threads pour éviter les explosions.
*   **Exécution Pas à Pas (Step-by-Step)** : Exécute une seule instruction à la fois, idéale pour le débogage et la pédagogie.
*   **Exécution Complète Multi-Thread** : Exécute tous les threads jusqu'à completion.
*   **Gestion des Entrées/Sorties** : Zones de texte dédiées pour fournir des données d'entrée et visualiser la sortie.
*   **Visualisation de l'État en Temps Réel** avec support multi-thread.

-----

## 🎨 Identification Visuelle des Threads

### Coloration Automatique
Chaque thread possède sa propre couleur pour faciliter l'identification visuelle :

| Thread | Couleur | Code Hex |
|--------|---------|----------|
| **T0** | 🔵 Bleu | `#2196F3` |
| **T1** | 🟢 Vert | `#4CAF50` |
| **T2** | 🟠 Orange | `#FF9800` |
| **T3** | 🟣 Violet | `#9C27B0` |
| **T4** | 🔴 Rouge | `#F44336` |
| **T5** | 🟤 Marron | `#795548` |
| **T6** | 🔘 Bleu-gris | `#607D8B` |
| **T7** | 🩷 Rose | `#E91E63` |

### Affichage dans l'Interface
- **Sortie Globale** : Chaque caractère affiché porte la couleur de son thread d'origine
- **Caractères Hexadécimaux** : Les caractères non-imprimables (ex: `0x01`) héritent de la couleur de leur thread
- **Légende Interactive** : Une légende colorée s'affiche automatiquement en mode multi-thread
- **Séparateurs Visuels** : Un séparateur `|` gris sépare les sorties de différents threads

-----

##  **Métriques de Performance & Qualité**

### 🎯 **Optimisations v1.3.1**
| Métrique | Avant (v1.3.0) | Après (v1.3.1) | Amélioration |
|----------|------------------|-----------------|--------------|
| **Lignes de code** | 566 lignes | 486 lignes | **-14%** |
| **Méthodes statiques** | 5 obsolètes | 0 | **-100%** |
| **Architecture** | Hybride | 100% Instance | **✅ Cohérent** |
| **Warnings** | 5 deprecation | 0 | **✅ Clean** |
| **Memory leaks** | 0 | 0 | **✅ Stable** |

### ⚡ **Fonctionnalités Avancées**
- **🔍 Step Debugging** : Exécution pas à pas avec support multi-thread
- **🎨 Visual Threading** : 8 couleurs distinctes pour identifier les threads
- **📈 Real-time Metrics** : Compteurs d'étapes et statistiques d'exécution
- **🛡️ Error Isolation** : Crash d'un thread n'affecte pas les autres
- **🧹 Smart Cleanup** : Garbage collection automatique des threads terminés

### 🏆 **Compatibilité & Standards**
- **ES6+ Modern JavaScript** : Classes, const/let, template literals
- **Cross-browser Support** : Chrome, Firefox, Safari, Edge
- **Mobile Responsive** : Interface adaptative pour tablettes/mobiles
- **Accessibility** : Labels ARIA, contraste respecté, navigation clavier

-----

# 🎓 **Comprendre le Fork en Brainfuck - Guide Pédagogique**

## 📚 **Qu'est-ce qu'un Fork ?**

Le **fork** est une instruction spéciale (représentée par `f`) qui permet de **dupliquer** un thread en cours d'exécution. C'est comme si le programme se "clonait" à un moment précis.

## 🧬 **Métaphore : La Photocopieuse**

Imaginez que votre programme soit une **recette de cuisine** et chaque thread soit un **cuisinier** :

```
📋 Recette : "f,f."
🧑‍🍳 Cuisinier T0 commence à lire la recette...
```

### **Étape 1 : Le Premier 'f' (Position 0)**
```
📋 Recette : [f] , f .
🧑‍🍳 T0 lit : "Dupliquez-vous !"
```

**Résultat :** T0 se duplique → Un deuxième cuisinier T1 apparaît !

```
🧑‍🍳 T0 : f [,] f .  ← Continue à la position suivante
👨‍🍳 T1 : [f] , f .  ← Commence au début de la recette !
```

## 🔄 **Principe Fondamental : "Unix-Style Fork"**

### **⚠️ Point Crucial :**
Quand un thread est créé par fork Unix-style, le **parent reçoit le PID de l'enfant** dans la cellule courante, l'**enfant reçoit 0**. Les deux threads continuent après le fork avec des valeurs différentes permettant l'exécution conditionnelle.

## 📖 **Exemple Détaillé : Code Unix-Style `f[+++.]`**

### **Positions du Code :**
```
Position:  0   1   2   3   4   5   6
Code:      f   [   +   +   +   .   ]
           ↑   ↑   ↑   ↑   ↑   ↑   ↑
        Fork Boucle Inc Inc Inc Sortie Fin
```

### **Exécution Chronologique Unix-Style :**

#### **🕐 Temps 1 : Début**
```
T0: [f] [ + + + . ]  ← Position 0
```
- T0 exécute le fork → Crée T1
- **T0 (parent)** : reçoit PID=1 dans cellule[0], avance position 1
- **T1 (enfant)** : reçoit 0 dans cellule[0], avance position 1

#### **🕑 Temps 2 : Évaluation de la boucle**
```
T0: f [[] + + + . ]  ← Position 1, cellule[0]=1 (PID)
T1: f [[] + + + . ]  ← Position 1, cellule[0]=0 (enfant)
```
- **T0** : cellule[0]=1 ≠ 0 → **entre dans la boucle** (position 2)
- **T1** : cellule[0]=0 = 0 → **saute après `]`** (position 7, fin de programme)

#### **🕒 Temps 3 : Exécution divergente**
```
T0: f [ [+] + + . ]  ← Position 2, exécute +++.
T1: TERMINÉ         ← Position 7, thread halted
```
- **T0** : exécute `+++.` → cellule[0] devient 4 → affiche 0x04
- **T1** : terminé, aucune sortie

**Résultat Unix-Style :**
- **Sortie :** `0x04` (uniquement le parent)
- **Threads :** T0 actif, T1 terminé
- **Comportement :** Exécution conditionnelle réussie

#### **🕓 Temps 4 : Affichage final**
```
T0: f , f [.]  ← Position 3 (affiche "a")
T1: f , f [.]  ← Position 3 (affiche "b")
T2:       [.]  ← Position 3 (affiche valeur par défaut)
T3:       [.]  ← Position 3 (affiche valeur par défaut)
```

**Résultat prévisible : 2 threads lisent, puis 4 threads affichent !**

## 🎯 **Pourquoi ce Comportement ?**

### **Avantages Pédagogiques :**

1. **🔍 Simplicité Conceptuelle**
   - Les threads continuent logiquement **après** l'instruction qui les crée
   - Comportement **prévisible** et **intuitif**

2. **👀 Visualisation Claire**
   - Croissance **contrôlée** du nombre de threads
   - Pas d'explosion exponentielle incontrôlée

3. **🛡️ Protection Naturelle**
   - Évite naturellement les fork bombs excessives
   - Comportement plus **stable** et **analysable**

4. **📊 Analyse Comportementale**
   - Permet l'étude de patterns de parallélisme **réalistes**
   - Montre un modèle proche des **vrais systèmes**

## 🧪 **Exemples Pratiques**

### **Exemple 1 : Fork Simple**
```brainfuck
f.
```
**Résultat Unix-Style :**
- **Parent (T0)** : Reçoit PID=1 → affiche 0x01
- **Enfant (T1)** : Reçoit 0 → affiche 0x00  
- **Sortie :** `0x01|0x00` (PID parent|zéro enfant)

### **Exemple 2 : Fork Unix-Style Simple**
```brainfuck
+++f.
```
**Résultat :**
- T0 (parent) : cellule=3 → fork → reçoit PID=1 → affiche 0x01
- T1 (enfant) : cellule=3 → fork → reçoit 0 → affiche 0x00
- **Sortie :** `0x01|0x00` (PID parent|zéro enfant)

### **Exemple 3 : Fork avec Exécution Conditionnelle**
```brainfuck
f[+++.]
```
**Résultat :**
- T0 (parent) : fork → reçoit PID=1 → entre dans boucle [1≠0] → affiche 0x04
- T1 (enfant) : fork → reçoit 0 → saute la boucle [0=0] → aucune sortie
- **Sortie :** `0x04` (seul le parent exécute)

## 🚨 **Pièges Courants**

### **❌ Erreur de Compréhension**
```brainfuck
f[+++.]
```
**On pourrait penser (incorrectement) :**
- Que les deux threads exécutent la même chose

**En réalité (Unix-style fork) :**
- T0 (parent) : fork → reçoit PID=1 → exécute [+++.] car 1≠0
- T1 (enfant) : fork → reçoit 0 → saute [+++.] car 0=0
- **Seul le parent produit une sortie**

### **✅ Bonne Compréhension**
Le fork Unix-style permet l'**exécution conditionnelle** : parent et enfant peuvent suivre des chemins différents selon la valeur de retour du fork.

## 🎓 **Métaphore : Le Superviseur et l'Ouvrier**

```
        T0 (Superviseur)
         ↓
    [Fork] ← Délégation
       ↙ ↘
   T1 (0)   T0 (PID=1)
   Ouvrier  Superviseur
      ↓        ↓
   [Tâche A] [Tâche B]
```

Le **fork Unix-style** assigne des **rôles différents** : le superviseur (parent) reçoit l'ID de l'ouvrier, l'ouvrier (enfant) reçoit 0, permettant une **division du travail** !

## 🔬 **Valeur Éducative**

Ce comportement enseigne :

1. **🧠 Concepts de parallélisme** : Exécution simultanée
2. **🔄 Récursion** : Auto-duplication
3. **⚖️ Gestion des ressources** : Limites nécessaires
4. **🎭 Comportements émergents** : Résultats inattendus des règles simples

## 💡 **En Résumé**

Le fork en Brainfuck est un **"Unix-Style Fork"** : le parent reçoit le PID de l'enfant, l'enfant reçoit 0, permettant une **exécution conditionnelle** et une **division du travail** authentique, conforme aux standards POSIX ! 🚀

-----

## ⚡ Principe d'Ordonnancement des Threads

### Modèle d'Exécution
L'interpréteur utilise un **ordonnancement coopératif round-robin** pour gérer l'exécution des threads multiples :

#### 🔄 Round-Robin Coopératif
```
Thread T0 → Thread T1 → Thread T2 → ... → Thread Tn → T0 → ...
```

### Fonctionnement Détaillé

#### Mode "Step (Tous Threads)"
1. **Snapshot** : Capture de l'état actuel de tous les threads
2. **Itération séquentielle** : Chaque thread actif exécute **une instruction**
3. **Gestion des forks** : Les nouveaux threads créés sont traités au cycle suivant
4. **Nettoyage automatique** : Suppression immédiate des threads terminés

#### Mode "Step Thread Actuel"  
- Exécution d'**un seul thread** à la fois
- Permet un contrôle fin thread par thread
- Idéal pour le débogage d'interactions inter-threads

### Gestion du Cycle de Vie

| État | Description | Action |
|------|-------------|---------|
| **ACTIVE** | Thread en cours d'exécution | Participe au round-robin |
| **HALTED** | Thread terminé (`IP >= code.length`) | Supprimé automatiquement |
| **FORK** | Thread créant un enfant | Enfant ajouté au cycle suivant |

### Exemple d'Ordonnancement

#### Code : `+++f++f.`
```
Cycle 1: T0(IP=0): +    → cell[0]=1
Cycle 2: T0(IP=1): +    → cell[0]=2  
Cycle 3: T0(IP=2): +    → cell[0]=3
Cycle 4: T0(IP=3): f    → Fork: T0(cell=0), T1(ptr=1,cell=1)
Cycle 5: T0(IP=4): +    → cell[0]=1
         T1(IP=4): +    → cell[1]=2
Cycle 6: T0(IP=5): +    → cell[0]=2
         T1(IP=5): f    → Fork: T1(cell=0), T2(ptr=2,cell=1)  
Cycle 7: T0(IP=6): .    → Affiche chr(2), T0 HALTED
         T1(IP=6): .    → Affiche chr(0), T1 HALTED
         T2(IP=6): .    → Affiche chr(1), T2 HALTED
```

### Avantages de ce Modèle

✅ **Prévisibilité** : Ordonnancement déterministe  
✅ **Simplicité** : Pas de concurrence réelle, pas de synchronisation  
✅ **Contrôle** : Possibilité d'exécution pas à pas  
✅ **Débogage** : Visualisation claire de l'état de tous les threads  
✅ **Sécurité** : Protection contre les fork bombs

### Limitations

⚠️ **Pas de parallélisme réel** : Exécution séquentielle simulée  
⚠️ **Pas de synchronisation** : Pas de primitives de synchronisation entre threads  
⚠️ **Ordonnancement fixe** : Pas de priorités ou d'ordonnancement adaptatif

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
| **`f`** | **Fork thread** | ✅ **Nouveau !** |

-----

## 🚀 Démarrage Rapide

Ce projet ne nécessite aucune dépendance externe ni configuration de serveur.

### Structure du Projet

```
brainfuck/
├── index.html                # Interface utilisateur avec support multi-thread
├── BrainfuckInterpreter.js   # Moteur d'interprétation avec multithreading
├── package.json              # Configuration NPM et scripts de versioning
├── README.md                 # Documentation principale (ce fichier)
├── CHANGELOG.md              # Historique des versions et modifications
├── LICENSE                   # Licence MIT du projet
├── docs/                     # Documentation professionnelle
│   ├── API.md               # Documentation de l'API
│   ├── EXAMPLES.md          # Exemples et tutoriels
│   └── test-unix-fork.md    # Guide des tests Unix-style
├── scripts/                  # Scripts de déploiement et versioning
│   ├── update-version.js    # Script de mise à jour des versions
│   ├── deploy.sh            # Script de déploiement Unix
│   └── deploy.bat           # Script de déploiement Windows
└── templates/                # Templates GitHub (issues, PR)
```

### Lancement

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/vfarcy/brainfuck.git
    cd brainfuck
    ```

2.  **Ouvrir l'application** :
    Ouvrez le fichier **`index.html`** directement dans votre navigateur web.

3.  **Version en ligne** :
    Accédez directement à la version déployée : [GitHub Pages](https://vfarcy.github.io/brainfuck/)

### Configuration Optionnelle (Développement)

```bash
# Installer les dépendances NPM (optionnel, pour le versioning)
npm install

# Scripts de développement disponibles
npm run version:patch  # Incrémenter la version patch
npm run version:minor  # Incrémenter la version minor  
npm run version:major  # Incrémenter la version major
npm run build          # Mettre à jour les versions manuellement
```

-----

## 💻 Architecture du Code

Le projet est conçu avec une séparation claire entre la Vue (HTML/UI) et le Modèle (Logique d'interpréteur).

### 1\. `BrainfuckInterpreter.js` (Le Moteur avec Threading)

| Méthode | Rôle |
| :--- | :--- |
| `constructor(code, input, threadId, parentId)` | Initialise un thread avec gestion du threading. |
| `handleFork()` | **Nouveau** : Gère la commande `f` avec création d'un thread enfant. |
| `step()` | Exécute une instruction (incluant `f`). |
| `runAll()` | Exécute un thread jusqu'à l'arrêt. |
| `runAllThreads()` | **Nouveau** : Exécute tous les threads actifs jusqu'à completion. |
| `getAllThreadStates()` | **Nouveau** : Retourne l'état de tous les threads. |
| `resetThreadManager()` | **Nouveau** : Remet à zéro le gestionnaire de threads. |

### 2\. `index.html` (Interface Multi-Thread)

Nouvelles fonctionnalités UI :
- **Section Thread Info** : Affiche l'ID du thread actuel et ses relations.
- **Vue Multi-Thread** : Tableau de bord de tous les threads actifs.
- **Contrôle de Limite** : Configuration de la limite maximale de threads.
- **Coloration `f`** : La commande fork est mise en évidence en orange.

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
+++f>+++f
```

### Fibonacci avec Fork
```brainfuck
+>+[>>+>f<<<-]
```

### ⚠️ Fork Bomb (À éviter !)
```brainfuck
+[f+]
```

-----

## 🖥️ Messages de Log et Console

L'interpréteur génère des **messages de debug détaillés** dans la console du navigateur (F12) pour faciliter le développement et le débogage des programmes multithreadés.

### 📋 Types de Messages

#### 🔧 Initialisation et Chargement
```
✅ BrainfuckInterpreter chargé avec succès
✅ Toutes les méthodes critiques sont disponibles
🔄 Reset complet du gestionnaire de threads
```

#### 🧵 Gestion des Threads
```
🧵 Création Thread T0 (parent: Tnone)
📈 Thread principal créé, activeThreads = 1
🔍 État du gestionnaire de threads:
  - Total threads: 2
  - ActiveThreads compteur: 2
  - NextId: 2
  - MaxThreads: 8
```

#### 🔀 Opérations de Fork
```
🔍 Thread T0 tente un fork (forks actuels: 0/2)
🔍 Debug Fork: Threads actifs = 1, Limite = 8
📋 Threads dans le manager: T0(ACTIVE, forks: 0/2)
🔀 Fork créé: Parent T0 (forks: 1/2) → Enfant T1 | PTR: 0 → 1
📊 Threads après fork: 2 total, 2 actifs
```

#### ⚡ Exécution Pas à Pas
```
📍 Thread T0 step: IP=0/5, instruction='+'
⚡ T0: + (IP: 0 → 1)
🔄 Executing step for 2 threads
⚠️ Thread T0 a atteint sa limite de forks (2/2) - Fork ignoré
```

#### 🛑 Fin et Nettoyage
```
🛑 Thread T0 terminé (IP: 5/5)
🛑 Thread T0 marqué comme terminé (IP: 5/5)
🧹 Nettoyage forcé après step...
🔍 Début nettoyage: 2 threads total
  - T0: HALTED (IP: 5/5)
  - T1: ACTIVE (IP: 4/5)
🗑️ Thread T0 marqué pour nettoyage
🧹 Thread T0 supprimé
🧹 Nettoyé 1 threads terminés. Actifs: 1
```

#### ❌ Erreurs et Limitations
```
❌ Fork refusé: 8/8 threads
⚠️ Thread T5 a atteint sa limite de forks (2/2) - Fork ignoré
⚠️ Thread T3 déjà supprimé, ignoré
```

### 🔍 Comment Utiliser la Console

1. **Ouvrir la console** :
   - **Chrome/Firefox** : F12 → Onglet "Console"
   - **Edge** : F12 → Onglet "Console"

2. **Filtrer les messages** :
   ```javascript
   // Dans la console, tapez pour filtrer :
   console.clear()  // Nettoyer
   ```

3. **Surveiller l'exécution** :
   - Messages **🔀** : Création de nouveaux threads
   - Messages **⚡** : Exécution d'instructions
   - Messages **🛑** : Fin de threads
   - Messages **🧹** : Nettoyage automatique

### 📊 Exemple de Trace Complète

#### Code : `+++f.`
```
✅ BrainfuckInterpreter chargé avec succès
🔄 Reset complet du gestionnaire de threads
🧵 Création Thread T0 (parent: Tnone)
📍 Thread T0 step: IP=0/5, instruction='+'
⚡ T0: + (IP: 0 → 1)
📍 Thread T0 step: IP=1/5, instruction='+'
⚡ T0: + (IP: 1 → 2)
📍 Thread T0 step: IP=2/5, instruction='+'
⚡ T0: + (IP: 2 → 3)
📍 Thread T0 step: IP=3/5, instruction='f'
🔍 Thread T0 tente un fork (forks actuels: 0/2)
🔀 Fork créé: Parent T0 (forks: 1/2) → Enfant T1 | PTR: 0 → 1
⚡ T0: f (IP: 3 → 4)
🔄 Executing step for 2 threads
📍 Thread T0 step: IP=4/5, instruction='.'
⚡ T0: . (IP: 4 → 5)
📍 Thread T1 step: IP=4/5, instruction='.'
⚡ T1: . (IP: 4 → 5)
🛑 Thread T0 marqué comme terminé (IP: 5/5)
🛑 Thread T1 marqué comme terminé (IP: 5/5)
🧹 Nettoyage forcé après step...
🔍 Début nettoyage: 2 threads total
🗑️ Thread T0 marqué pour nettoyage
🗑️ Thread T1 marqué pour nettoyage
🧹 Thread T0 supprimé
🧹 Thread T1 supprimé
🎯 Tous les threads sont terminés
```

### 💡 Conseils de Débogage

- **🔍 Suivre l'IP** : Regarder la progression `IP: x → y` pour chaque thread
- **📊 Surveiller les forks** : Compter les créations vs suppressions
- **🧹 Vérifier le nettoyage** : S'assurer que les threads terminés sont supprimés
- **⚠️ Attention aux limites** : Messages d'avertissement pour les fork bombs

-----

## 🎛️ Interface Utilisateur

### 🔧 **Modes d'Affichage**

L'interface s'adapte automatiquement selon le type d'exécution :

#### 📱 **Mode Single-Thread** (par défaut)
- **Zone d'entrée globale** : Pour les données lues par la commande `,`
- **Zone de sortie globale** : Affiche la sortie de la commande `.`
- **État de l'interpréteur** : Affichage détaillé (IP, PTR, code, mémoire)
- **Boutons** : `▶ Exécuter D'un Coup`, `👣 Exécuter Pas à Pas`, `🔄 Réinitialiser`

#### 🔀 **Mode Multi-Thread** (activé automatiquement avec la commande `f`)
- **Zones I/O individuelles** : Chaque thread a ses propres zones d'entrée et de sortie
- **Vue détaillée/compacte** : Bouton `👁️ Vue Détaillée` pour basculer entre les modes
- **🎯 Interface optimisée** : La zone "État de l'Interpréteur" se masque automatiquement (informations déjà disponibles par thread)
- **Boutons supplémentaires** : `👣 Step (Tous Threads)`, `👤 Step (Thread Actuel)`

### 📥📤 **Gestion des Données par Thread**

#### **Données d'Entrée (Input)**
- **Mode Single-Thread** : Zone globale unique
- **Mode Multi-Thread** : 
  - Zones individuelles pour chaque thread
  - Mise à jour en temps réel
  - Héritage automatique depuis le thread parent
  - Modification possible pendant l'exécution

#### **Données de Sortie (Output)**
- **🌟 Sortie Globale Unifiée** : Une seule zone de sortie pour tous les threads
- **🎨 Identification par Couleur** : Chaque thread a sa propre couleur (texte ET hexadécimal)
- **🏷️ Légende Interactive** : Affichage des couleurs et relations parent-enfant
- **📊 Temps Réel** : Mise à jour immédiate lors de l'exécution
- **🔢 Caractères Non-Imprimables** : Affichage en hexadécimal coloré par thread

**Exemple de Sortie Multi-Thread :**
```
Hello🔵0x0A🟢World🟠0x09🟣!🔴
🔵 T0: Hello (bleu)
🟢 T1: 0x0A (vert - nouvelle ligne avec badge vert) 
🟠 T2: World (orange)
🟣 T3: 0x09 (violet - tabulation avec badge violet)
🔴 T4: ! (rouge)
```

### 🎨 **Codes Couleur des Threads**

- **🔵 Bleu** : Thread actuel en cours d'exécution
- **🟢 Vert** : Threads actifs (en attente)
- **🔴 Rouge** : Threads terminés (halted)
- **🟡 Jaune** : Indication d'exécution en cours

### 💡 **Utilisation Pratique**

1. **Pour débuter** : Utilisez le mode single-thread avec les exemples simples
2. **Pour tester les forks** : Ajoutez une commande `f` et observez le passage automatique en mode multi-thread
3. **Pour déboguer** : 
   - **Mode single-thread** : Utilisez la zone "État de l'Interpréteur" pour un suivi détaillé
   - **Mode multi-thread** : Utilisez la vue détaillée des threads (bouton `👁️`) pour analyser chaque thread individuellement
4. **Pour des données complexes** : Modifiez les zones d'entrée individuelles pendant l'exécution

### 🔄 **Transitions Automatiques**

L'interface s'adapte intelligemment selon le contexte :
- **Single → Multi** : Lors du premier fork (`f`), l'interface bascule automatiquement
- **Masquage conditionnel** : La zone "État de l'Interpréteur" disparaît en mode multi-thread pour éviter la duplication d'informations
- **Réinitialisation** : Le bouton `🔄 Réinitialiser` revient toujours au mode single-thread

-----

## 🔧 Développement et Versioning

### 📦 Gestion des Versions

Ce projet utilise un **système de versioning automatique** basé sur le [Semantic Versioning](https://semver.org/) :

- **MAJOR** (X.y.z) : Changements incompatibles avec les versions précédentes
- **MINOR** (x.Y.z) : Nouvelles fonctionnalités compatibles
- **PATCH** (x.y.Z) : Corrections de bugs

#### **🤖 Scripts de Versioning**

```bash
# Incrémenter automatiquement la version
npm run version:patch   # 1.2.3 → 1.2.4 (corrections)
npm run version:minor   # 1.2.3 → 1.3.0 (nouvelles fonctionnalités)
npm run version:major   # 1.2.3 → 2.0.0 (changements majeurs)

# Mettre à jour manuellement tous les fichiers
npm run build
```

#### **📂 Fichiers Mis à Jour Automatiquement**

- **`package.json`** : Version principale du projet
- **`BrainfuckInterpreter.js`** : Commentaire de version avec date
- **`index.html`** : Cache-busting, pied de page, constantes JavaScript
- **`README.md`** : Badges de version et licence

### 🛠️ Structure du Projet

```
brainfuck/
├── BrainfuckInterpreter.js    # Cœur de l'interpréteur multithreading
├── index.html                 # Interface utilisateur complète
├── package.json               # Configuration NPM et scripts
├── CHANGELOG.md               # Historique des versions
├── docs/                      # Documentation professionnelle
│   ├── API.md                # Documentation de l'API
│   ├── EXAMPLES.md           # Exemples et tutoriels
│   └── test-unix-fork.md     # Guide des tests Unix-style
├── scripts/                   # Scripts de déploiement et versioning
│   └── update-version.js     # Script de versioning automatique
└── templates/                 # Templates GitHub
```

### 🧪 Tests et Exemples

#### **Programmes de Test Recommandés**

```brainfuck
# Tests simples
+++f.              # Fork simple: T0=3, T1=3
++f>++f.            # Fork avec déplacement
+++f>+++f.          # Test multi-thread classique

# Tests avancés (augmentez la limite de threads si nécessaire)
++++f>++++f>++++f.  # 4 threads avec sorties différentes
++[f+]              # Attention: Fork bomb potentiel!
```

#### **Configuration de Débogage**

- **Console développeur** (F12) : Messages détaillés d'exécution
- **Mode pas à pas** : Analyse thread par thread
- **Vue détaillée** : Mémoire, état et historique complets
- **Limite de threads** : Ajustable dans l'interface (défaut: 8)

-----

## 🔧 **Développement et Architecture**

### 🎯 **Changelog v1.5.0 (Octobre 2025)**

#### 📚 **Documentation Professionnelle**
- **Structure docs/ créée** : Organisation professionnelle de la documentation
- **test-unix-fork.md** : Conversion du fichier HTML en documentation Markdown
- **API.md & EXAMPLES.md** : Documentation technique complète
- **Templates GitHub** : Issues et PR templates pour contributions

#### 🧹 **Nettoyage Repository**
- **Suppression fichiers obsolètes** : Nettoyage des anciens fichiers de test HTML
- **Organisation scripts/** : Regroupement des scripts de déploiement et versioning
- **Structure cohérente** : Alignement avec les standards de projets open-source
- **Documentation croisée** : Liens entre les différents documents

#### 🔧 **Améliorations UI**
- **Espacement amélioré** : Meilleure séparation visuelle dans l'interface
- **Message final optimisé** : Affichage plus clair de "Programme terminé"
- **Cohérence terminologique** : Alignement complet avec la sémantique Unix-style

### 📈 **Métriques de Qualité v1.5.0**
- **Documentation complète** : README, API, exemples, et guides de test
- **Structure professionnelle** : Organisation optimale pour contributions
- **Zéro fichier obsolète** : Repository propre et maintenu
- **Cohérence parfaite** : Documentation alignée avec l'implémentation

-----

## 🤝 Contribution

Les contributions sont les bienvenues \! Si vous trouvez un bug ou avez une suggestion d'amélioration :

1.  **Forkez** le projet et clonez votre fork
2.  **Créez une branche** pour votre fonctionnalité (`git checkout -b feature/nom-feature`)
3.  **Développez** en suivant les conventions du projet
4.  **Testez** vos modifications avec différents programmes Brainfuck
5.  **Committez** avec des messages clairs (`git commit -m "feat: description"`)
6.  **Mettez à jour** la version si nécessaire (`npm run version:patch`)
7.  **Poussez** votre branche (`git push origin feature/nom-feature`)
8.  **Ouvrez** une **Pull Request** avec une description détaillée

-----

## 📜 Licence

Ce projet est sous licence MIT.

**Auteur:** [Valéry Farcy](https://github.com/vfarcy)
