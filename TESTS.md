# 🧪 Programmes de Test - Interpréteur Brainfuck Multithreadé

## 🎯 Instructions de Test Préliminaires

1. **Ouvrir l'interpréteur** : Lancez `index.html` dans le navigateur
2. **Console de développement** : Ouvrir F12 pour voir les logs détaillés
3. **Mode de test** : Utiliser "Step (Tous Threads)" pour l'analyse détaillée
4. **Observation** : Interface adaptative selon single/multi-thread

---

## 1. Test Simple - Fork Basique
```brainfuck
+++f+++.
```
**Résultat attendu :**
- **T0** (principal) : cell[0]=3, fork, cell[0]=0, cell[0]+++=3, affiche `0x03` (bleu)
- **T1** (enfant) : ptr=1, cell[1]=1, cell[1]+++=4, affiche `0x04` (vert)
- **Sortie globale unifiée** : `0x030x04` avec couleurs distinctes
- **Observer :** Légende des threads, zones d'entrée séparées

---

## 2. Test Fork Multiple
```brainfuck
+f+f+.
```
**Résultat attendu :**
- **4 threads créés** : T0, T1, T2, T3
- **Explosion contrôlée** : Chaque thread crée des enfants
- **Observer :** Protection limite (8 threads maximum)
- **Interface** : Masquage automatique "État Interpréteur" en mode multi-thread

---

## 3. Test avec Boucles et Divergence
```brainfuck
++f[+.]
```
**Résultat attendu :**
- **T0** (parent) : cell[0]=2, fork, cell[0]=0, entre en boucle infinie, affiche continuellement
- **T1** (enfant) : ptr=1, cell[1]=1, n'entre pas en boucle ([1] != 0), s'arrête après une exécution
- **Observer :** Différence de comportement visible dans les zones de sortie

---

## 4. Test Caractères Non-Imprimables
```brainfuck
++++++++++f.
```
**Résultat attendu :**
- **T0** : cell[0]=10, fork, cell[0]=0, affiche `0x00` (NULL) en bleu
- **T1** : ptr=1, cell[1]=1, affiche `0x01` en vert
- **Observer :** Badges hexadécimaux colorés avec tooltips informatifs

---

## 5. Test Protection Fork Bomb
```brainfuck
+[f]
```
**Résultat attendu :**
- **Limitation automatique** à 8 threads maximum
- **Message d'erreur** : "Protection fork bomb: Limite globale de threads atteinte (8/8). Fork refusé."
- **Observer :** Protection robuste contre les fork bombs

---

## 6. Test Interface Adaptative
```brainfuck
+++.
```
**Puis :**
```brainfuck
+++f.
```
**Observer :**
- **Mode single-thread** : Zone "État Interpréteur" visible
- **Mode multi-thread** : Zone "État Interpréteur" masquée automatiquement
- **Transition fluide** entre les modes

---

## 7. Test Mixte Imprimable/Non-Imprimable
```brainfuck
++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.f.
```
**Résultat attendu :**
- **T0** : Affiche "Hello " avec caractères normaux
- **T1** : Affiche caractère suivant
- **Observer :** Mélange de texte normal et badges hexadécimaux colorés

---

## 🔍 Debug et Logs Console

### Messages Attendus :
```
🔍 État du gestionnaire de threads:
  - Total threads: X
  - ActiveThreads compteur: Y
⚡ T0: + (IP: 0 → 1)
🔀 Fork créé: Parent T0 → Enfant T1 | PTR: 0 → 1
🛑 Thread TX terminé (IP: X/Y)
🧹 Nettoyage forcé après step...
```

### Logs à Surveiller :
- Création et suppression de threads
- Évolution des pointeurs IP et PTR
- Messages de protection fork bomb
- Nettoyage automatique des threads terminés

---

## ✅ Checklist de Validation

### Interface Utilisateur :
- [ ] **Sortie globale unifiée** avec couleurs par thread
- [ ] **Légende dynamique** affichant les relations parent-enfant
- [ ] **Zones d'entrée séparées** pour chaque thread
- [ ] **Caractères hexadécimaux** avec couleurs de thread
- [ ] **Interface adaptative** : masquage auto "État Interpréteur"
- [ ] **Pied de page** avec version correcte (v1.2.5)

### Fonctionnalités Core :
- [ ] **Protection fork bomb** : Limite 8 threads
- [ ] **Nettoyage automatique** des threads terminés
- [ ] **Gestion d'erreurs** robuste avec messages clairs
- [ ] **Reset complet** : Nettoyage total de l'état
- [ ] **Cache busting** : Version 1.2.5 dans l'URL du script

### Console & Debug :
- [ ] **Messages structurés** avec émojis identificateurs
- [ ] **Gestion d'erreurs** avec stack traces
- [ ] **Nettoyage logs** : Début/fin de processus clairs
- [ ] **Validation** : Pas d'erreurs JavaScript critiques

---

## 🚨 Tests de Stress

### Test Limite Exacte :
```brainfuck
ffffffff
```
**Attendu :** Doit échouer au 8ème fork avec message d'erreur

### Test Complexité :
```brainfuck
+++f>+++f>+++f>+++f>+++f>+++f.
```
**Attendu :** 7 threads, puis arrêt avec message d'erreur au 8ème

---

## �️ En Cas de Problème

### Étapes de Diagnostic :
1. **Console F12** : Vérifier les erreurs JavaScript
2. **Version** : Confirmer v1.2.5 en bas de page
3. **Cache** : Actualiser avec Ctrl+F5
4. **Reset** : Utiliser le bouton Reset entre les tests
5. **Logs** : Filtrer les messages par émoji (🔍, ⚡, 🔀, etc.)

### Points de Vérification :
- Version cohérente partout (1.2.5)
- Pas de références à `maxForksPerThread` (supprimé)
- Protection compte bien le total de threads
- Interface s'adapte automatiquement