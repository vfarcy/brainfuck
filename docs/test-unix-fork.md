# 🔀 Test Unix-Style Fork - Brainfuck v1.5.0

## 🎯 Comportement Unix-Style Fork

- **Thread Parent:** Reçoit le PID de l'enfant (valeur > 0)
- **Thread Enfant:** Reçoit 0
- **Exécution conditionnelle:** Utilise des boucles pour distinguer parent/enfant

## Test 1: Fork simple avec sortie conditionnelle

### Description
Ce programme:
1. Exécute un fork (f)
2. Si valeur = 0 (enfant): affiche 'C' (Child)
3. Si valeur > 0 (parent): affiche 'P' (Parent) puis le PID

### Code Brainfuck
```brainfuck
f                    # Fork: Parent reçoit PID enfant, Enfant reçoit 0
[                     # Si valeur > 0 (parent)
  >++++++++++         # Cellule suivante = 10 pour newline
  [>++++[>++<<-]>>+<-] # Préparer 'P' (80)
  >++.                # Afficher 'P' (Parent)
  <                   # Retour au PID
  .                   # Afficher le PID (comme nombre)
  >++++++++++.        # Afficher newline
  <<                  # Revenir à la cellule originale
]
+                     # Incrémenter pour tester si on est l'enfant
[                     # Si valeur > 0 après increment (on était à 0, donc enfant)
  -                   # Remettre à 0
  >++++++++++         # Cellule suivante = 10 pour newline
  [>++++[>++<<-]>>+<-] # Préparer 'C' (67)
  >----.              # Afficher 'C' (Child)
  <++++++++++.        # Afficher newline
  <                   # Revenir
]
```

### Code optimisé pour test
```brainfuck
f[>++++++++++[>++++[>++<<-]>>+<-]>++.<.>++++++++++.<]++++++++[>++++++++++<-]>++[->++++++++++[>++++[>++<<-]>>+<-]>----.<!++++++++++.<<]
```

### Résultat attendu
- **Thread Parent:** Affiche 'P' suivi du PID de l'enfant
- **Thread Enfant:** Affiche 'C'

## Test 2: Fork multiple avec identification

### Description
Ce programme crée plusieurs forks et affiche l'ID de chaque thread.

### Code Brainfuck
```brainfuck
f                    # Premier fork
f                    # Deuxième fork  
f                    # Troisième fork
+++++++[>++++++++++<-]>++.  # Afficher le contenu de la cellule (PID ou 0)
```

### Code optimisé pour test
```brainfuck
fff+++++++[>++++++++++<-]>++.
```

### Résultat attendu
- Chaque thread affiche sa valeur (PID reçu lors du fork ou 0 pour l'enfant)
- Démonstration de la création de multiples processus

## Test 3: Fork avec logique parent/enfant

### Description
Utilise la valeur de retour du fork pour exécuter du code différent selon le processus.

### Code Brainfuck
```brainfuck
f                    # Fork
[>+<-]               # Copier la valeur (PID) dans la cellule suivante
>                    # Aller à la copie
[                    # Si PID > 0 (parent)
  <                  # Retour à la cellule originale
  +++++++[>++++++++++<-]>++++. # Afficher 'H' (72) - Hello from parent
  >                  # Cellule suivante
  >+++++++[>++++++++++<-]>.    # Afficher 'i' (105)
  <                  # Retour
  [-]                # Vider la cellule pour sortir
]
<                    # Retour à la cellule originale
[                    # Si valeur = 0 après la boucle (enfant)
  +++++++[>++++++++++<-]>++.   # Afficher 'B' (66) - Bye from child
  >+++++++[>++++++++++<-]>++++++. # Afficher 'y' (121)
  >+++++++[>++++++++++<-]>++++. # Afficher 'e' (101)
  <[-]               # Vider pour sortir
]
```

### Code optimisé pour test
```brainfuck
f[>+<-]>[<+++++++[>++++++++++<-]>++++.>+++++++[>++++++++++<-]>.<<[-]]<[+++++++[>++++++++++<-]>++.>+++++++[>++++++++++<-]>++++++.>+++++++[>++++++++++<-]>++++.<<[-]]
```

### Résultat attendu
- **Thread Parent:** Affiche "Hi"
- **Thread Enfant:** Affiche "Bye"

## Usage avec l'interpréteur

Pour tester ces exemples avec BrainJS:

1. **Interface principale:** Utilisez `index.html` et copiez le code optimisé
2. **Mode debug:** Activez le mode pas-à-pas pour voir l'exécution des threads
3. **Observation:** Regardez l'affichage des différents threads et leurs PIDs

## Concepts techniques

### Mécanisme du fork Unix-style
- La commande `f` crée un nouveau thread (processus enfant)
- Le parent continue avec le PID de l'enfant dans la cellule courante
- L'enfant démarre avec 0 dans la cellule courante
- Chaque thread exécute le code de manière indépendante

### Patterns de programmation
1. **Test conditionnel:** `[code_parent]` - exécute seulement si valeur > 0
2. **Test enfant:** Incrémenter puis tester permet de détecter l'enfant
3. **Copie de valeur:** `[>+<-]` pour préserver la valeur du PID

### Applications pratiques
- **Parallélisation:** Distribuer des tâches entre processus
- **Serveur:** Un processus parent peut gérer les connexions
- **Pipeline:** Chaîner des opérations entre processus parent/enfant

---

*Ce document fait partie de la documentation de BrainJS v1.5.0. Pour plus d'informations sur l'implémentation du fork Unix-style, consultez le [README.md](../README.md) et la [documentation API](API.md).*