# 📚 Exemples Avancés - BrainJS

Cette page présente des exemples avancés d'utilisation de BrainJS avec le support multithreading et la commande fork Unix-style.

## 🔀 Exemples Fork Unix-Style

### 1. Test Simple - Identification Parent/Enfant

```brainfuck
+++f.
```

**Résultat :**
- **Parent (T0)** : Affiche `0x01` (PID de l'enfant)
- **Enfant (T1)** : Affiche `0x00` (valeur fork enfant)

---

### 2. Exécution Conditionnelle Parent/Enfant

```brainfuck
f[>+++++++++.>+.+++++++.+++.>>-.<<-.<.+++.------.--------.>>+.<]
```

**Comportement :**
- **Parent** : Exécute le code entre `[...]` (affiche "Hello")
- **Enfant** : Saute complètement le bloc

---

### 3. Fork Double - Création d'Arbre de Threads

```brainfuck
++f>++f<.>.
```

**Résultat :**
- Crée 4 threads au total (T0 → T1, puis T0→T2 et T1→T3)
- Chaque thread affiche ses valeurs locales

---

### 4. Communication Parent-Enfant via Mémoire Partagée

```brainfuck
# Version simplifiée pour démonstration
+++>+++f<[>.<]>[+.<]
```

**Principe :**
- Parent et enfant utilisent des cellules différentes
- Possible synchronisation via patterns de valeurs

---

## 🎯 Programmes Utilitaires

### 1. Compteur de Threads Actifs

```brainfuck
+f+f+f+++++++++.
```

**Utilité :** Teste la création de multiples threads et affiche le décompte.

---

### 2. Test de Performance Fork

```brainfuck
+[f+]
```

**⚠️ Attention :** Programme dangereux (fork bomb) - activez la protection !

---

### 3. Nettoyage de Cellule Universel

```brainfuck
[-]
```

**Usage :** Remet n'importe quelle cellule à 0, indépendamment de sa valeur.

---

## 🧮 Algorithmes Classiques Adaptés au Multithreading

### 1. Hello World avec Fork

```brainfuck
# Version parent-enfant
f[>++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.++++++..+++.>>-.<<-.+++.------.--------.>>+.<]
```

---

### 2. Calcul Parallèle Simple

```brainfuck
# Chaque thread calcule sa propre valeur
+++f[+++.]>f[++.]
```

---

### 3. Pipeline de Traitement

```brainfuck
# Thread principal → Thread de traitement → Thread de sortie
++++>++++f<f[>.<]>[.<]
```

---

## 🔧 Patterns de Développement

### 1. Branchement Conditionnel Standard

```brainfuck
f         # Fork
[         # Si parent (PID > 0)
  # Code parent
]
          # Code enfant (ou commun)
```

---

### 2. Séparation Complète Parent/Enfant

```brainfuck
f[>+<-]   # Fork et copier PID
>         # Aller à la copie
[         # Si parent
  <       # Code parent
  >[-]    # Nettoyer et sortir
]
<         # Si enfant (valeur = 0)
[         # Code enfant
  [-]     # Nettoyer
]
```

---

### 3. Synchronisation par Polling

```brainfuck
# Attente que tous les enfants terminent
f         # Créer enfant
[         # Tant que PID existe
  # Code de vérification
  # (pattern complexe en Brainfuck)
]
```

---

## 📊 Métriques et Performance

### Limites du Système
- **Threads Max** : 8 par défaut
- **Mémoire/Thread** : 30 000 cellules
- **Protection Fork Bomb** : Activée automatiquement

### Optimisations Recommandées
1. **Minimiser les Forks** : Coût en mémoire
2. **Nettoyer les Cellules** : `[-]` après usage
3. **Éviter les Boucles Infinies** : Toujours prévoir une sortie

---

## 🎓 Exercices Pratiques

### Exercice 1 : Premier Fork
Créez un programme qui fait un fork et affiche des valeurs différentes pour le parent et l'enfant.

### Exercice 2 : Arbre Binaire
Créez un arbre de 4 threads avec 2 niveaux de fork.

### Exercice 3 : Communication
Tentez de faire communiquer parent et enfant via des patterns de mémoire.

---

## 🔗 Ressources Complémentaires

- **Documentation Complète** : Voir `README.md`
- **Tests Interactifs** : Voir `test-unix-fork.html`
- **API Reference** : Voir `docs/API.md`
- **Guide Performance** : Voir `docs/PERFORMANCE.md`

---

*Mis à jour pour BrainJS v1.4.0 - Fork Unix-Style Implementation*