# 🔧 API Reference - BrainJS

Documentation complète de l'API BrainfuckInterpreter v1.4.0 avec support Unix-style fork.

## 📋 Table des Matières

- [Classe BrainfuckInterpreter](#classe-brainfuckinterpreter)
- [Constructeur](#constructeur)
- [Méthodes Publiques](#méthodes-publiques)
- [Propriétés](#propriétés)
- [Thread Manager](#thread-manager)
- [Événements et Callbacks](#événements-et-callbacks)
- [Constantes](#constantes)

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

### Fork Unix-Style
```javascript
const interpreter = new BrainfuckInterpreter("+++f.", "");
const result = interpreter.runAllThreads();

// Parent: output contient ASCII 1 (PID enfant)
// Enfant: output contient ASCII 0 (valeur enfant)
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

### Métriques Disponibles
- Nombre d'instructions exécutées
- Nombre de threads créés/actifs
- Utilisation mémoire par thread
- Temps d'exécution global

---

*Documentation mise à jour pour BrainJS v1.4.0*  
*Dernière modification : 1er octobre 2025*