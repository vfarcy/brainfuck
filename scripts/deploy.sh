#!/bin/bash

# 🚀 Script de déploiement automatique pour BrainJS
# Déploie automatiquement sur GitHub Pages avec vérifications

set -e  # Arrêt en cas d'erreur

echo "🚀 Démarrage du déploiement BrainJS..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage coloré
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifications préalables
print_status "Vérification de l'environnement..."

# Vérifier que nous sommes dans un repo Git
if [ ! -d ".git" ]; then
    print_error "Pas dans un repository Git!"
    exit 1
fi

# Vérifier que les fichiers essentiels existent
required_files=("index.html" "BrainfuckInterpreter.js" "README.md" "package.json")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Fichier manquant: $file"
        exit 1
    fi
done

print_success "Fichiers essentiels présents"

# Vérifier qu'il n'y a pas de modifications non commitées
if ! git diff-index --quiet HEAD --; then
    print_warning "Modifications non commitées détectées"
    echo "Voulez-vous continuer? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_error "Déploiement annulé"
        exit 1
    fi
fi

# Récupérer la version actuelle
VERSION=$(node -p "require('./package.json').version")
print_status "Version actuelle: $VERSION"

# Récupérer la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
print_status "Branche actuelle: $CURRENT_BRANCH"

# Vérifier que nous sommes sur main ou master
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
    print_warning "Vous n'êtes pas sur la branche principale ($CURRENT_BRANCH)"
    echo "Voulez-vous continuer le déploiement depuis cette branche? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_error "Déploiement annulé"
        exit 1
    fi
fi

# Tests de base
print_status "Exécution des tests de base..."

# Test syntaxe JavaScript
if node -c BrainfuckInterpreter.js; then
    print_success "Syntaxe JavaScript valide"
else
    print_error "Erreur de syntaxe dans BrainfuckInterpreter.js"
    exit 1
fi

# Test HTML basique
if command -v html5validator >/dev/null 2>&1; then
    if html5validator --root . index.html; then
        print_success "HTML valide"
    else
        print_warning "Warnings HTML détectés (non bloquant)"
    fi
else
    print_warning "html5validator non installé - validation HTML ignorée"
fi

# Construire et préparer le déploiement
print_status "Préparation du déploiement..."

# Créer un commit de déploiement si nécessaire
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "deploy: Prepare deployment for version $VERSION"
    print_success "Commit de déploiement créé"
fi

# Push vers origin
print_status "Push vers GitHub..."
git push origin "$CURRENT_BRANCH"
print_success "Code pushé vers GitHub"

# Si nous avons une branche gh-pages, mettre à jour
if git show-ref --verify --quiet refs/heads/gh-pages; then
    print_status "Mise à jour de la branche gh-pages..."
    
    # Sauvegarder la branche actuelle
    ORIGINAL_BRANCH=$CURRENT_BRANCH
    
    # Switcher vers gh-pages
    git checkout gh-pages
    
    # Merger les changements
    git merge "$ORIGINAL_BRANCH" --no-edit
    
    # Push gh-pages
    git push origin gh-pages
    
    # Retour à la branche originale
    git checkout "$ORIGINAL_BRANCH"
    
    print_success "Branche gh-pages mise à jour"
else
    print_warning "Branche gh-pages n'existe pas"
    echo "Voulez-vous créer la branche gh-pages pour GitHub Pages? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git checkout -b gh-pages
        git push -u origin gh-pages
        git checkout "$CURRENT_BRANCH"
        print_success "Branche gh-pages créée"
    fi
fi

# Afficher les informations de déploiement
print_success "🎉 Déploiement terminé!"
echo ""
echo "📋 Résumé du déploiement:"
echo "  • Version: $VERSION"
echo "  • Branche: $CURRENT_BRANCH"
echo "  • Commit: $(git rev-parse --short HEAD)"
echo ""
echo "🌐 URLs disponibles:"
echo "  • Repository: https://github.com/vfarcy/brainfuck"
echo "  • GitHub Pages: https://vfarcy.github.io/brainfuck/"
echo ""
echo "🔄 Prochaines étapes recommandées:"
echo "  1. Vérifier le déploiement sur GitHub Pages"
echo "  2. Tester l'interface sur différents navigateurs"
echo "  3. Créer un tag de release si nécessaire:"
echo "     git tag -a v$VERSION -m \"Release version $VERSION\""
echo "     git push origin v$VERSION"

print_success "Script de déploiement terminé avec succès!"