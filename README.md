# 🧠 BrainJS: Interpréteur Brainfuck### Comportement de `f`
Quand la commande `f` est rencontrée, le thread actuel **fork** :

| Thread | Action |
|--------|---------|
| **Parent** | **Garde sa valeur actuelle** (pas d'écrasement) |
| **Enfant** | Le pointeur avance d'une position (`ptr++`) et la nouvelle cellule est mise à `1` |aScript avec Multithreading

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-2025--09--30-lightgrey.svg)

Un interpréteur **Brainfuck** complet, implémenté en **JavaScript pur (Vanilla JS)**, avec une interface utilisateur interactive et **support du multithreading**. Il permet l'exécution pas à pas, la visualisation détaillée de l'état de la mémoire et inclut un éditeur avec coloration syntaxique. Cette version étend le Brainfuck standard avec la **commande `f` de fork**.

## 🆕 Nouveautés v1.3.0

- **🎨 Coloration des Threads** : Sortie multi-thread avec identification visuelle par couleur pour chaque thread
- **� Légende Interactive** : Affichage d'une légende colorée pour identifier les threads en mode multi-thread
- **🔄 Skip Fork Behavior** : Correction du comportement des forks - les données du parent sont préservées au lieu d'être écrasées
- **📝 Documentation Corrigée** : Mise à jour du README pour refléter le vrai comportement "Skip Fork" au lieu de "Restart Fork"
- **⚡ Capture Temps Réel** : Système de capture des sorties en temps réel pendant l'exécution
- **📊 Cache Persistant** : Système de cache pour préserver les sorties des threads même après nettoyage
- **🎁 Interface Unifiée** : Sortie globale unifiée fonctionnant à la fois en mode pas-à-pas et exécution complète

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

## 🔀 Nouvelle Commande: Fork (`f`)

### Comportement de `f` (Skip Fork)
Quand la commande `f` est rencontrée, le thread actuel **fork** :

| Thread | Action |
|--------|---------|
| **Parent** | **Garde sa valeur actuelle** (pas d'écrasement) |
| **Enfant** | Le pointeur avance d'une position (`ptr++`) et la nouvelle cellule est mise à `1` |

### Exemples

#### Exemple Simple
```brainfuck
++f
```
**Résultat :**
- Thread T0 (parent) : `cell[0] = 2` (valeur préservée)
- Thread T1 (enfant) : `cell[1] = 1`

#### ⚠️ Exemple Dangereux (Fork Bomb)
```brainfuck
+[f+]
```
**Attention !** Ce code créerait une explosion exponentielle de threads :
1. `cell[0] = 1` → Entre dans la boucle
2. `f` → Fork (Thread T0: garde `cell[0] = 1`, Thread T1: `cell[1] = 1`)
3. `+` → Les deux threads incrémentent leur cellule (toutes deviennent `2`)
4. `]` → Retour au `[` car les cellules ne sont pas nulles
5. Répétition infinie avec doublement des threads à chaque tour !

**Protection :** Une limite globale de 8 threads actifs par défaut empêche les fork bombs. Plus simple et efficace qu'une double protection.

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

## 🔄 **Principe Fondamental : "Skip Fork - Continue Après"**

### **⚠️ Point Crucial :**
Quand un thread est créé par fork, il **continue APRÈS** le fork qui l'a créé, sans exécuter cette instruction fork. Les deux threads (parent et enfant) reprennent **à la même position suivante**.

## 📖 **Exemple Détaillé : Code `f,f.`**

### **Positions du Code :**
```
Position:  0   1   2   3
Code:      f   ,   f   .
           ↑   ↑   ↑   ↑
        Fork Lire Fork Afficher
```

### **Exécution Chronologique :**

#### **🕐 Temps 1 : Début**
```
T0: [f] , f .  ← Position 0
```
- T0 exécute le fork → Crée T1
- **Les deux** avancent à la position 1

#### **🕑 Temps 2 : Après le premier fork**
```
T0: f [,] f .  ← Position 1  
T1: f [,] f .  ← Position 1 (continue après le fork !)
```
- T0 exécute `,` (lit entrée "a")
- T1 exécute `,` (lit entrée "b")
- **Les deux** avancent à la position 2

#### **🕒 Temps 3 : Deuxième fork**
```
T0: f , [f] .  ← Position 2
T1: f , [f] .  ← Position 2
```
- T0 exécute `f` (fork) → Crée T2 **qui commence en position 3**
- T1 exécute `f` (fork) → Crée T3 **qui commence en position 3**
- T0 et T1 avancent à la position 3

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
**Résultat :**
- T0 : fork → affiche
- T1 : affiche
- **Sortie :** `0x00|0x00` (2 zéros)

### **Exemple 2 : Fork avec Données**
```brainfuck
+f.
```
**Résultat :**
- T0 : incrémente → fork (garde valeur) → affiche
- T1 : affiche (cellule à 1 car enfant)
- **Sortie :** `0x01|0x01`

### **Exemple 3 : Skip Fork avec Données**
```brainfuck
+f,.
```
**Résultat :**
- T0 : incrémente → fork → lit "a" → affiche "a"
- T1 : continue après fork → lit "b" → affiche "b"
- **Sortie :** `0x61|0x62` ("a"|"b")

## 🚨 **Pièges Courants**

### **❌ Erreur de Compréhension**
```brainfuck
f,f.
```
**On pourrait penser (incorrectement) :**
- Que les threads recommencent depuis le début du programme

**En réalité (skip fork) :**
- T0 et T1 continuent après chaque fork
- T0 : fork → `,` → fork → `.`
- T1 : `,` → fork → `.` (skip le premier fork)
- T2 et T3 : `.` seulement (créés au deuxième fork)

### **✅ Bonne Compréhension**
Chaque thread **continue** là où le fork l'a placé, créant un parallélisme **logique** et **prévisible**.

## 🎓 **Métaphore : La Ligne de Production**

```
        T0 (Ouvrier principal)
         ↓
    [Fork] ← Duplication
       ↙ ↘
     T1   T0 (continuent ensemble)
      ↓    ↓
   [Tâche] [Tâche] (même étape suivante)
```

Chaque **duplication** crée un nouvel ouvrier qui commence **à la même étape suivante**, pas au début de la ligne !

## 🔬 **Valeur Éducative**

Ce comportement enseigne :

1. **🧠 Concepts de parallélisme** : Exécution simultanée
2. **🔄 Récursion** : Auto-duplication
3. **⚖️ Gestion des ressources** : Limites nécessaires
4. **🎭 Comportements émergents** : Résultats inattendus des règles simples

## 💡 **En Résumé**

Le fork en Brainfuck est un **"Skip Fork"** : chaque nouveau thread **continue après** l'instruction fork qui l'a créé, permettant un parallélisme **logique** et **contrôlé**, plus proche des vrais systèmes multi-threadés ! 🚀

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
├── update-version.js         # Script de mise à jour automatique des versions
├── README.md                 # Documentation principale (ce fichier)
└── GITHUB_PAGES_GUIDE.md    # Guide de déploiement et troubleshooting
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
├── update-version.js          # Script de versioning automatique
├── README.md                  # Documentation principale
└── GITHUB_PAGES_GUIDE.md     # Guide de déploiement
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
