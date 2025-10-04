# 🔧 API Reference - Bra1nF0rk

Documentation complète de l'API Bra1nF0rk v1.11.0 - *Where Brainfuck code goes parallel, see your threads run*

## 📋 Table des Matières

- [Classe BrainfuckInterpreter](#classe-brainfuckinterpreter)
- [Classe BrainfuckStatsAnalyzer](#classe-brainfuckstatsanalyzer) 🆕
- [Constructeur](#constructeur)
- [Méthodes Publiques](#méthodes-publiques)
- [Système de Statistiques](#système-de-statistiques) 🆕
- [Propriétés](#propriétés)
- [Thread Manager](#thread-manager)
- [Événements et Callbacks](#événements-et-callbacks)
- [Constantes](#constantes)
- [Exemples d'Usage](#exemples-dusage)

---

## 🏗️ Classe BrainfuckInterpreter

### Constructeur

```javascript
new BrainfuckInterpreter(code, input, threadId = 0, parentId = null)
```

#### Paramètres
- **`code`** *(string)* : Le code Brainfuck à exécuter
- **`input`** *(string)* : Les données d'entrée pour les commandes `,`
- **`threadId`** *(number)* : Identifiant unique du thread (défaut: 0)
- **`parentId`** *(number|null)* : ID du thread parent (null pour le thread principal)

#### Exemple
```javascript
const interpreter = new BrainfuckInterpreter("+++.", "");
```

---

## 📊 Classe BrainfuckStatsAnalyzer 🆕

Classe utilitaire pour l'analyse avancée des statistiques d'exécution. Toutes les méthodes sont statiques.

### Méthodes Statiques

#### `generateReport(interpreter)`
Génère un rapport complet d'analyse des performances.

```javascript
const report = BrainfuckStatsAnalyzer.generateReport(interpreter);
console.log(report);
```

**Paramètres :**
- **`interpreter`** *(BrainfuckInterpreter)* : L'instance à analyser

**Retourne :** *(string)* Rapport formaté en texte

#### `analyzeStats(stats)`
Analyse en détail l'objet statistiques et génère des métriques.

```javascript
const analysis = BrainfuckStatsAnalyzer.analyzeStats(interpreter.stats);
```

**Paramètres :**
- **`stats`** *(Object)* : L'objet `interpreter.stats`

**Retourne :** *(Object)* Objet d'analyse avec métriques calculées

#### `generateHTML(analysis, stats)`
Génère un rapport HTML formaté avec graphiques et métriques.

```javascript
const htmlReport = BrainfuckStatsAnalyzer.generateHTML(analysis, interpreter.stats);
document.body.innerHTML = htmlReport;
```

#### `generateMarkdown(analysis, stats)`
Génère un rapport Markdown formaté pour documentation.

```javascript
const mdReport = BrainfuckStatsAnalyzer.generateMarkdown(analysis, interpreter.stats);
```

#### `generateSummary(analysis)`
Génère un résumé concis des métriques principales.

```javascript
const summary = BrainfuckStatsAnalyzer.generateSummary(analysis);
```

### Méthodes Helper

#### `calculateEfficiency(stats)` 🔒 *Private*
Calcule l'efficience d'exécution (instructions utiles vs totales).

#### `analyzeMemoryUsage(stats)` 🔒 *Private*
Analyse les patterns d'utilisation mémoire.

#### `categorizeInstructions(stats)` 🔒 *Private*
Catégorise les instructions par type (mouvement, calcul, IO, contrôle).

---

## 📈 Système de Statistiques 🆕

L'objet `interpreter.stats` contient des métriques détaillées d'exécution :

### Structure des Statistiques

```javascript
interpreter.stats = {
  // 🕐 Performance
  totalSteps: 0,                    // Nombre total d'instructions exécutées
  executionStartTime: null,         // Timestamp de début (performance.now())
  executionEndTime: null,           // Timestamp de fin
  
  // 📝 Instructions
  instructionCounts: {              // Compteur par type d'instruction
    '>': 0, '<': 0, '+': 0, '-': 0,
    '.': 0, ',': 0, '[': 0, ']': 0, 'f': 0
  },
  
  // 🔄 Boucles
  loopIterations: 0,                // Nombre total d'itérations de boucles
  maxLoopDepth: 0,                  // Profondeur maximale de boucles imbriquées
  currentLoopDepth: 0,              // Profondeur actuelle
  
  // 💾 Mémoire
  maxPtrReached: 0,                 // Position mémoire maximale atteinte
  minPtrReached: 0,                 // Position mémoire minimale atteinte
  memoryWrites: 0,                  // Nombre d'écritures en mémoire
  memoryReads: 0,                   // Nombre de lectures mémoire
  cellsUsed: new Set(),             // Set des cellules utilisées
  overflowCount: 0,                 // Nombre de dépassements (255→0)
  underflowCount: 0,                // Nombre de soupassements (0→255)
  
  // 🧵 Threading
  forksCreated: 0,                  // Nombre de forks créés par ce thread
  maxConcurrentThreads: 1,          // Maximum de threads simultanés
  
  // 📤 Input/Output
  inputCharsRead: 0,                // Caractères lus depuis l'entrée
  outputCharsWritten: 0             // Caractères écrits en sortie
};
```

### Méthodes de Statistiques

#### `generateStatsAnalysis()`
Génère une analyse complète des statistiques actuelles.

```javascript
const analysis = interpreter.generateStatsAnalysis();
```

#### `updateMemoryStats()`
Met à jour les statistiques mémoire (appelée automatiquement).

```javascript
interpreter.updateMemoryStats(); // Usage interne
```

---

## 🎯 Méthodes Publiques

### Exécution

#### `step()`
Exécute une seule instruction et retourne l'état de continuation.

```javascript
const continued = interpreter.step();
// Retourne: true si le thread continue, false si terminé
```

#### `run()`
Exécute le programme jusqu'à completion (thread unique).

```javascript
const result = interpreter.run();
// Retourne: objet avec output, halted, steps
```

#### `runAllThreads()`
Exécute tous les threads en mode multithreading.

```javascript
const result = interpreter.runAllThreads();
// Retourne: objet avec statistiques globales
```

#### `stepSingleThread()`
Exécute une instruction sur le thread actuel uniquement.

```javascript
const continued = interpreter.stepSingleThread();
```

#### `generateStatsAnalysis()` 🆕
Génère une analyse complète des statistiques du thread.

```javascript
const analysis = interpreter.generateStatsAnalysis();
```

**Retourne :** *(Object)* Analyse détaillée avec métriques calculées

#### `updateMemoryStats()` 🆕
Met à jour les statistiques d'utilisation mémoire.

```javascript
interpreter.updateMemoryStats(); // Appelée automatiquement
```

---

### Gestion des Threads

#### `handleFork()` 🆕 v1.4.0
Gère la commande fork Unix-style.

```javascript
// Appelée automatiquement par step() lors de l'instruction 'f'
// Parent: reçoit PID enfant dans memory[ptr]
// Enfant: reçoit 0 dans memory[ptr]
```

#### `cleanupHaltedThreads()`
Nettoie les threads terminés du gestionnaire.

```javascript
const cleanedCount = interpreter.cleanupHaltedThreads();
// Retourne: nombre de threads supprimés
```

#### `hasMultipleActiveThreads()`
Vérifie s'il y a plusieurs threads actifs.

```javascript
const hasMultiple = interpreter.hasMultipleActiveThreads();
// Retourne: boolean
```

---

### Utilitaires

#### `buildLoopMap()`
Construit la carte des correspondances de boucles `[` et `]`.

```javascript
const loopMap = interpreter.buildLoopMap();
// Retourne: Map avec les correspondances
```

#### `reset()`
Remet l'interpréteur à son état initial.

```javascript
interpreter.reset();
```

---

## 📊 Propriétés

### État du Thread

| Propriété | Type | Description |
|-----------|------|-------------|
| `threadId` | number | Identifiant unique du thread |
| `parentId` | number\|null | ID du thread parent |
| `halted` | boolean | Thread terminé ou non |
| `isForked` | boolean | Thread créé par fork |

### Mémoire et Exécution

| Propriété | Type | Description |
|-----------|------|-------------|
| `memory` | Array\<number\> | Tableau mémoire (30000 cellules) |
| `ptr` | number | Pointeur mémoire actuel |
| `ip` | number | Pointeur d'instruction |
| `code` | string | Code Brainfuck source |

### Entrées/Sorties

| Propriété | Type | Description |
|-----------|------|-------------|
| `input` | Array\<string\> | Buffer d'entrée |
| `output` | string | Sortie accumulée |

### Compteurs et Limites

| Propriété | Type | Description |
|-----------|------|-------------|
| `forkCount` | number | Nombre de forks créés par ce thread |
| `maxForksPerThread` | number | Limite de forks par thread (défaut: 8) |
| `children` | Array\<number\> | IDs des threads enfants |

---

## 🎮 Thread Manager

### Structure
```javascript
threadManager = {
  threads: Map,           // Map<number, BrainfuckInterpreter>
  nextId: number,         // Prochain ID disponible
  maxThreads: number      // Limite globale (défaut: 8)
}
```

### Accès
```javascript
const manager = interpreter.threadManager;
const allThreads = manager.threads;
const threadCount = manager.threads.size;
```

---

## 📡 Événements et Callbacks

### Callback Output Global
```javascript
// Dans le contexte browser
window.onThreadOutput = function(threadId, output) {
  console.log(`Thread ${threadId}: ${output}`);
};
```

### Événements Internes
- **Fork Creation** : Logs automatiques lors de la création
- **Thread Completion** : Logs lors de la terminaison
- **Error Handling** : Exceptions pour les erreurs critiques

---

## 🔢 Constantes

```javascript
const MEMORY_SIZE = 30000;      // Taille mémoire par thread
const MAX_BYTE_VALUE = 256;     // Valeur max des cellules (0-255)
const DEFAULT_MAX_THREADS = 8;  // Limite threads par défaut
```

---

## 🎯 Exemples d'Usage

### Création et Exécution Simple
```javascript
const interpreter = new BrainfuckInterpreter("+++.", "");
const result = interpreter.run();
console.log(result.output); // Caractère ASCII 3
```

### Fork Unix-Style Sécurisé ✅
```javascript
const interpreter = new BrainfuckInterpreter("f[>+<-]>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]<]<+[+++++++++++++++++++++++++++++++++++++++++++++++.[-]]", "");
const results = interpreter.runAllThreads();

// Père affiche '0', Fils affiche '1'
results.forEach(r => {
    console.log(`Thread ${r.threadId}: ${r.output}`);
});
```

### Analyse de Performance 🆕
```javascript
const interpreter = new BrainfuckInterpreter("+++f[+++.[-]]", "");
const results = interpreter.runAllThreads();

// Générer un rapport d'analyse
const report = BrainfuckStatsAnalyzer.generateReport(interpreter);
console.log(report);

// Analyser les statistiques
const analysis = BrainfuckStatsAnalyzer.analyzeStats(interpreter.stats);
console.log("Efficience:", analysis.efficiency);
```

### Rapport HTML 🆕
```javascript
const interpreter = new BrainfuckInterpreter("complexProgram", "");
interpreter.runAllThreads();

const analysis = BrainfuckStatsAnalyzer.analyzeStats(interpreter.stats);
const htmlReport = BrainfuckStatsAnalyzer.generateHTML(analysis, interpreter.stats);

// Afficher dans une page web
document.body.innerHTML = htmlReport;
```

### Execution Pas à Pas
```javascript
const interpreter = new BrainfuckInterpreter("+++.", "");

while (interpreter.step()) {
  console.log(`IP: ${interpreter.ip}, Memory[0]: ${interpreter.memory[0]}`);
}
```

### Gestion Multithreading
```javascript
const interpreter = new BrainfuckInterpreter("f[+++.]", "");

// Setup callback
window.onThreadOutput = (id, output) => {
  console.log(`Thread ${id} output: ${output}`);
};

const result = interpreter.runAllThreads();
console.log(`Created ${interpreter.threadManager.threads.size} threads`);
```

---

## 🛡️ Gestion d'Erreurs

### Exceptions Lancées
- **Fork Bomb Protection** : Limite de threads atteinte
- **Memory Access** : Tentative d'accès hors limites
- **Invalid Instruction** : Instruction non reconnue

### Gestion Recommandée
```javascript
try {
  const result = interpreter.runAllThreads();
} catch (error) {
  if (error.message.includes('fork bomb')) {
    console.log('Protection fork bomb activée');
  } else {
    console.error('Erreur d\'exécution:', error);
  }
}
```

---

## 🔄 Lifecycle des Threads

1. **Création** : `new BrainfuckInterpreter()`
2. **Enregistrement** : Ajout au threadManager
3. **Exécution** : Via `step()` ou `run()`
4. **Fork** : Création threads enfants via `handleFork()`
5. **Terminaison** : `halted = true`
6. **Nettoyage** : Suppression via `cleanupHaltedThreads()`

---

## 📈 Performance et Optimisation

### Conseils de Performance
- Limiter le nombre de threads actifs
- Nettoyer régulièrement les threads terminés
- Éviter les boucles infinies avec fork
- Utiliser `stepSingleThread()` pour le débogage

### Métriques Disponibles 🆕
- **Performance :** Instructions/seconde, temps d'exécution, efficience
- **Mémoire :** Cellules utilisées, overflows/underflows, portée mémoire
- **Threading :** Forks créés, threads actifs, concurrence maximale
- **Instructions :** Répartition par type, itérations de boucles, profondeur
- **I/O :** Caractères lus/écrits, ratio input/output

### Patterns à Éviter ⚠️
```javascript
// ❌ INCORRECT - Boucle infinie après fork
"+++f[+++.]"   // Parent entre en boucle infinie

// ✅ CORRECT - Nettoyage de cellule
"+++f[+++.[-]]"   // [-] vide la cellule pour sortir
```

---

## 🔗 Voir Aussi

- **[README.md](../README.md)** - Documentation générale Bra1nF0rk
- **[EXAMPLES.md](EXAMPLES.md)** - Exemples avancés et tutoriels
- **[GitHub Repository](https://github.com/vfarcy/brainfuck)** - Code source complet

---

*Documentation mise à jour pour **Bra1nF0rk v1.11.0** - Where Brainfuck code goes parallel, see your threads run*  
*Dernière modification : 2 octobre 2025*