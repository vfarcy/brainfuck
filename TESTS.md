# 🧪 Programmes de Test - Visualisation Multithreadée

## 1. Test Simple - Fork Basique
```brainfuck
+++f+++.
```
**Résultat attendu :**
- Thread T1 (parent) : cell=0, affiche '\x03' (3)
- Thread T2 (enfant) : ptr++, cell=1, affiche '\x04' (4)
- **Observer :** Compteur d'étapes, barres de progression, historique

---

## 2. Test Fork Multiple
```brainfuck
+f+f+.
```
**Résultat attendu :**
- 4 threads créés au total
- Chaque thread avec une valeur différente
- **Observer :** Répartition des étapes entre threads dans l'historique

---

## 3. Test avec Boucles
```brainfuck
++f[+.]
```
**Résultat attendu :**
- Thread parent : entre en boucle infinie, affiche caractères
- Thread enfant : ptr=1, cell=0, s'arrête immédiatement
- **Observer :** Différence de progression entre threads

---

## 4. Test Progression Visuelle
```brainfuck
>++++[<++++>-]<f>++++[<++++>-]<.
```
**Résultat attendu :**
- Code plus long pour mieux voir les barres de progression
- Thread parent : calcul de 16 puis fork
- Thread enfant : même calcul, affiche résultat
- **Observer :** Barres de progression qui avancent progressivement

---

## 5. Test Protection Fork Bomb
```brainfuck
+[f]
```
**Résultat attendu :**
- Limitation automatique à 10 threads
- Message d'erreur dans la console
- **Observer :** Protection contre la création excessive de threads

---

## 6. Test Debug et Logs
```brainfuck
+++f++.f.
```
**Résultat attendu :**
- Création de plusieurs threads à différents moments
- **Observer :** 
  - Console logs détaillés : `⚡ T{id}: {commande} (IP: avant → après)`
  - Compteur d'étapes qui s'incrémente
  - Historique d'exécution mis à jour en temps réel

---

## 🎯 Instructions de Test

1. **Ouvrir l'interpréteur** : Cliquez sur `index.html` dans le navigateur
2. **Coller un programme** : Utilisez un des codes ci-dessus
3. **Exécution pas à pas** : Utilisez le bouton "Step" pour voir l'évolution
4. **Observer les éléments** :
   - 📊 Compteur d'étapes (coin supérieur droit)
   - 📈 Barres de progression (vue multi-thread)
   - 📋 Historique d'exécution (section dédiée)
   - ✨ Animations de pulse/flash
5. **Console** : Ouvrir les outils développeur (F12) pour voir les logs détaillés
6. **Reset** : Tester le bouton Reset pour vérifier la remise à zéro complète

---

## ✅ Points à Vérifier

- [ ] Compteur d'étapes apparaît et s'incrémente correctement
- [ ] Barres de progression se remplissent selon l'avancement IP
- [ ] Historique montre les statistiques par thread
- [ ] Animations visuelles fonctionnent sans ralentir
- [ ] Console logs sont clairs et informatifs
- [ ] Reset remet tout à zéro (compteurs, historique, interface)
- [ ] Interface s'adapte au mode single/multi-thread
- [ ] Protection fork bomb fonctionne (max 10 threads)

---

## 🐛 En cas de Problème

Si vous rencontrez des issues :
1. Vérifiez la console pour les erreurs JavaScript
2. Assurez-vous que le code Brainfuck est valide
3. Testez d'abord avec des programmes simples
4. Utilisez le bouton Reset entre les tests