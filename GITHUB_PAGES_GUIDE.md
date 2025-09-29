# 🚀 Guide de Déploiement GitHub Pages

## Problème : "BrainfuckInterpreter.resetThreadManager is not a function"

### 🔍 Causes Possibles

1. **Fichiers non synchronisés** : `BrainfuckInterpreter.js` pas à jour sur GitHub
2. **Cache navigateur** : Ancienne version du fichier en cache
3. **Problème de chargement** : Script bloqué ou non trouvé
4. **Ordre de chargement** : Interface exécutée avant le chargement du script

### ✅ Solutions Implémentées

#### 1. Vérifications de Sécurité
- Contrôle de l'existence de `BrainfuckInterpreter` avant utilisation
- Vérification des méthodes critiques au chargement
- Gestion gracieuse des erreurs avec fallbacks

#### 2. Diagnostic Automatique
```javascript
// Au chargement de la page
if (typeof BrainfuckInterpreter === 'undefined') {
    console.error('❌ BrainfuckInterpreter non chargé !');
} else {
    console.log('✅ BrainfuckInterpreter chargé avec succès');
}
```

#### 3. Fallbacks Sécurisés
```javascript
// Appel sécurisé des méthodes
if (typeof BrainfuckInterpreter.resetThreadManager === 'function') {
    BrainfuckInterpreter.resetThreadManager();
} else {
    console.warn('resetThreadManager non disponible');
}
```

### 🛠️ Étapes de Débogage

#### Sur GitHub Pages
1. **Ouvrir la console** (F12)
2. **Vérifier les messages** :
   - ✅ `BrainfuckInterpreter chargé avec succès`
   - ✅ `Toutes les méthodes critiques sont disponibles`
3. **Si erreurs** :
   - Vérifier le commit des fichiers sur la branche
   - Forcer le refresh cache (Ctrl+F5)
   - Attendre la propagation GitHub (5-10 minutes)

#### Solutions d'Urgence
```javascript
// Test manuel dans la console
typeof BrainfuckInterpreter !== 'undefined'
typeof BrainfuckInterpreter.resetThreadManager === 'function'
```

### 🔄 Processus de Mise à Jour

1. **Commit local** : S'assurer que tous les fichiers sont commités
2. **Push vers GitHub** : `git push origin feature-fork`
3. **Activer Pages** : Settings → Pages → Branch: feature-fork
4. **Attendre déploiement** : 5-10 minutes de propagation
5. **Forcer refresh** : Ctrl+F5 dans le navigateur

### 📊 Vérification du Déploiement

#### URLs à Tester
- **Site principal** : `https://[username].github.io/brainfuck/`
- **Script direct** : `https://[username].github.io/brainfuck/BrainfuckInterpreter.js`

#### Signaux de Succès
- Console : `✅ BrainfuckInterpreter chargé avec succès`
- Interface : Pas d'erreur au clic sur "Réinitialiser"
- Fonctionnalité : `+++f.` fonctionne sans erreur

### 🆘 Si le Problème Persiste

1. **Vérifier la branche GitHub Pages** dans Settings
2. **Comparer les fichiers** locaux vs GitHub
3. **Tester en local** d'abord avec serveur HTTP
4. **Commit forcé** : `git add . && git commit -m "Fix GitHub Pages" && git push`

### 📝 Notes Techniques

- GitHub Pages a parfois un délai de cache
- Les fichiers `.js` doivent être en UTF-8
- Pas de caractères spéciaux dans les noms de fichiers
- Vérifier que la branche est bien déployée