#!/bin/bash
# Version automatique basée sur les tags Git

# Obtenir le dernier tag git ou 1.0.0 par défaut
VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "1.0.0")

# Obtenir le hash du commit actuel (court)
COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "dev")

# Obtenir la date actuelle
DATE=$(date +%Y-%m-%d)

# Version complète avec commit si pas sur un tag exact
if git describe --exact-match --tags HEAD >/dev/null 2>&1; then
    FULL_VERSION="$VERSION"
else
    FULL_VERSION="$VERSION-dev.$COMMIT"
fi

echo "Version détectée: $FULL_VERSION"
echo "Date: $DATE"

# Mettre à jour les fichiers
sed -i "s|^// Version .* - .*$|// Version $FULL_VERSION - Build automatique du $DATE|" BrainfuckInterpreter.js
sed -i "s|BrainfuckInterpreter\.js?v=[^\"]*|BrainfuckInterpreter.js?v=$FULL_VERSION|" index.html

echo "✅ Fichiers mis à jour avec la version $FULL_VERSION"