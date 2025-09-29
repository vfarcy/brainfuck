# 🔍 Analyse du Problème `++f++f`

## Problème Identifié

Le programme `++f++f` crée une **chaîne linéaire** de threads, pas une explosion :
- T0 → T1 → T2 → T3 → ... → T19

Chaque thread ne fait qu'**un seul fork** puis se termine rapidement, donc la limite par thread (2 forks) ne s'applique jamais.

## Timeline Détaillée

```
Code: + + f + + f
IP:   0 1 2 3 4 5

T0: ++    (IP=0,1) → cell[0]=2
T0: f     (IP=2)   → Fork: T0(cell=0) + T1(ptr=1,cell=1)
T0: ++    (IP=3,4) → cell[0]=2  
T0: f     (IP=5)   → Fork: T0(cell=0) + T2(ptr=1,cell=1)
T0: FIN   (IP=6)   → HALTED

T1: ++    (IP=3,4) → cell[1]=3
T1: f     (IP=5)   → Fork: T1(cell=0) + T3(ptr=2,cell=1) 
T1: FIN   (IP=6)   → HALTED

T2: ++    (IP=3,4) → cell[1]=3
T2: f     (IP=5)   → Fork: T2(cell=0) + T4(ptr=2,cell=1)
T2: FIN   (IP=6)   → HALTED

etc.
```

## Solutions Possibles

1. **Nettoyage automatique** : Forcer le nettoyage des threads HALTED
2. **Limitation globale** : Réduire maxThreads de 20 à 10
3. **Délai de fork** : Empêcher les forks consécutifs
4. **Détection de pattern** : Détecter les fork bombs

## Recommandation

Forcer le nettoyage automatique des threads HALTED avant chaque fork.