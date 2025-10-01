@echo off
REM 🚀 Script de déploiement Windows pour BrainJS
REM Version Windows PowerShell du script de déploiement

echo 🚀 Démarrage du déploiement BrainJS...

REM Vérifier que nous sommes dans un repo Git
if not exist ".git" (
    echo ❌ Pas dans un repository Git!
    exit /b 1
)

REM Vérifier les fichiers essentiels
if not exist "index.html" (
    echo ❌ Fichier manquant: index.html
    exit /b 1
)

if not exist "BrainfuckInterpreter.js" (
    echo ❌ Fichier manquant: BrainfuckInterpreter.js
    exit /b 1
)

if not exist "README.md" (
    echo ❌ Fichier manquant: README.md
    exit /b 1
)

if not exist "package.json" (
    echo ❌ Fichier manquant: package.json
    exit /b 1
)

echo ✅ Fichiers essentiels présents

REM Récupérer la version actuelle
for /f "tokens=*" %%i in ('node -p "require('./package.json').version"') do set VERSION=%%i
echo ℹ️  Version actuelle: %VERSION%

REM Récupérer la branche actuelle
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo ℹ️  Branche actuelle: %CURRENT_BRANCH%

REM Test syntaxe JavaScript
echo ℹ️  Test de syntaxe JavaScript...
node -c BrainfuckInterpreter.js
if errorlevel 1 (
    echo ❌ Erreur de syntaxe dans BrainfuckInterpreter.js
    exit /b 1
)
echo ✅ Syntaxe JavaScript valide

REM Ajouter et committer les changements
echo ℹ️  Préparation du déploiement...
git add .
git status --porcelain > nul
if not errorlevel 1 (
    git commit -m "deploy: Prepare deployment for version %VERSION%"
    echo ✅ Commit de déploiement créé
)

REM Push vers origin
echo ℹ️  Push vers GitHub...
git push origin %CURRENT_BRANCH%
if errorlevel 1 (
    echo ❌ Erreur lors du push
    exit /b 1
)
echo ✅ Code pushé vers GitHub

echo.
echo 🎉 Déploiement terminé!
echo.
echo 📋 Résumé du déploiement:
echo   • Version: %VERSION%
echo   • Branche: %CURRENT_BRANCH%
echo.
echo 🌐 URLs disponibles:
echo   • Repository: https://github.com/vfarcy/brainfuck
echo   • GitHub Pages: https://vfarcy.github.io/brainfuck/
echo.
echo 🔄 Prochaines étapes recommandées:
echo   1. Vérifier le déploiement sur GitHub Pages
echo   2. Tester l'interface sur différents navigateurs
echo   3. Créer un tag de release si nécessaire
echo.
echo ✅ Script de déploiement terminé avec succès!

pause