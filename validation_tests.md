# 🧪 Tests de Validation Multithreading

## Test 1: Programme Simple (devrait fonctionner)
```brainfuck
+++.
```
**Attendu**: 1 thread, pas de fork, affiche '\x03'

## Test 2: Fork Simple (devrait fonctionner)  
```brainfuck
+++f.
```
**Attendu**: 2 threads max, T0 affiche '\x00', T1 affiche '\x01'

## Test 3: Fork Multiple Linéaire (TEST CRITIQUE)
```brainfuck
+f+f
```
**Attendu**: Maximum 8 threads avec nouvelle limite

## Test 4: Fork avec Boucle (devrait être contrôlé)
```brainfuck
+[f]
```
**Attendu**: Limitation stricte à 8 threads, threads terminés nettoyés

## Validation Console

Pour chaque test, vérifiez dans la console :
- 🗑️ Messages de nettoyage automatique
- 📊 Comptage correct des threads actifs  
- ⚠️ Messages de limitation quand approprié
- 🔍 Debug détaillé de chaque fork

## Objectifs

1. **Test 1-2**: Doivent fonctionner parfaitement
2. **Test 3**: Ne doit PAS dépasser 8 threads  
3. **Test 4**: Doit être limité et contrôlé
4. **Tous**: Nettoyage automatique visible dans les logs