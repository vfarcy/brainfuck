# Test du problème "f,.,." en pas à pas

## Problème identifié
L'exécution pas à pas de "f,.,." ne se termine pas, alors que l'exécution en une fois fonctionne.

## Cause probable
1. **Double incrémentation IP pour 'f'** : Dans `BrainfuckInterpreter.js`, l'IP était incrémenté dans `handleFork()` ET à la fin de `step()`.
2. **Gestion de l'input** : Problème potentiel de synchronisation de la queue d'input entre threads.

## Correction appliquée
Dans `BrainfuckInterpreter.js`, ligne ~267 :
```javascript
case 'f':
    this.handleFork();
    // CORRECTION: Return direct car handleFork() gère déjà l'IP
    return true;
```

Avant c'était :
```javascript
case 'f':
    this.handleFork();
    // CORRECTION: Pas d'incrémentation car handleFork() gère l'IP
    return true;
    
// Puis plus loin :
this.ip++; // ← PROBLÈME : double incrémentation !
```

## Test à effectuer
1. Code : `f,.,.`
2. Input : `AB` (2 caractères)
3. **Mode Step** : Devrait maintenant se terminer correctement
4. **Mode Run All** : Devrait continuer à fonctionner

## Comportement attendu
- Thread parent (T0) : fork → lit 'A' → affiche 'A' → lit 'B' → affiche 'B' → termine
- Thread enfant (T1) : démarre après fork → lit depuis queue partagée → termine

## Résultat espéré
- Output : `AB` (ou `BA` selon ordre d'exécution)
- Tous les threads se terminent proprement
- Interface détecte la fin et désactive les boutons