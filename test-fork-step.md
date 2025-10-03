# Test du problème "f,.,." en pas à pas

## Problème identifié
L'exécution pas à pas de "f,.,." ne se termine pas. T0 se bloque à 55,6% et T1 à 44,4%.

## Analyse du code "f,.,."
- Indices: 0=f, 1=,, 2=., 3=,, 4=.
- Longueur code: 5 instructions
- 55,6% de 5 = environ 2,78 → T0 fait ~3 étapes 
- 44,4% de 5 = environ 2,22 → T1 fait ~2 étapes

## Cause probable
1. **Double incrémentation IP pour 'f'** : ✅ CORRIGÉ
2. **Threads ne se terminent pas à IP=5** : ⚠️ SUSPECT 
3. **Gestion de l'input vide** : Les commandes ',' mettent 0 si queue vide mais continuent

## Corrections appliquées
1. Return direct dans case 'f' ✅
2. Logs de debug étendus ✅  
3. Force halted=true si continued=false ✅

## Test recommandé
1. **Code** : `f,.,.` (exactement)
2. **Input** : `AB` (2 caractères) ou plus
3. **Mode Step** : Observer les logs console
4. **Rechercher** :
   - IP qui n'atteint jamais 5
   - continued=true en boucle
   - halted qui reste false

## Logs à surveiller
```
📍 Thread T0 step: IP=X/5, instruction='Y'
🔍 DEBUG Step result for T0: continued=Z, IP=X/5, halted=false
⚡ T0: Instruction exécutée (IP: X)
```

Si IP reste < 5 et continued=true en permanence → problème d'incrémentation
Si IP atteint 5 mais halted=false → problème détection fin