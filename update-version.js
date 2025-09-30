/**
 * Script de mise à jour automatique des versions
 * Lit la version depuis package.json et met à jour tous les fichiers
 */

const fs = require('fs');
const path = require('path');

// Lire la version depuis package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;
const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

console.log(`🔄 Mise à jour vers la version ${version}...`);

// 1. Mettre à jour BrainfuckInterpreter.js
const interpreterPath = 'BrainfuckInterpreter.js';
let interpreterContent = fs.readFileSync(interpreterPath, 'utf8');

// Remplacer la ligne de version
interpreterContent = interpreterContent.replace(
    /^\/\/ Version .* - .*$/m,
    `// Version ${version} - Mise à jour automatique du ${timestamp}`
);

fs.writeFileSync(interpreterPath, interpreterContent);
console.log(`✅ ${interpreterPath} mis à jour`);

// 2. Mettre à jour index.html
const htmlPath = 'index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Remplacer le paramètre de version du script
htmlContent = htmlContent.replace(
    /BrainfuckInterpreter\.js\?v=[0-9]+\.[0-9]+\.[0-9]+/,
    `BrainfuckInterpreter.js?v=${version}`
);

fs.writeFileSync(htmlPath, htmlContent);
console.log(`✅ ${htmlPath} mis à jour`);

// 3. Optionnel: Mettre à jour README.md avec la version
const readmePath = 'README.md';
if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Ajouter/mettre à jour un badge de version
    if (!readmeContent.includes('![Version]')) {
        const title = readmeContent.split('\n')[0];
        readmeContent = readmeContent.replace(
            title,
            `${title}\n\n![Version](https://img.shields.io/badge/version-${version}-blue.svg)\n![License](https://img.shields.io/badge/license-MIT-green.svg)`
        );
        
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`✅ ${readmePath} mis à jour avec badges`);
    }
}

console.log(`🎉 Mise à jour terminée pour la version ${version}!`);
console.log(`📝 N'oubliez pas de faire un commit avec: git add . && git commit -m "Bump version to ${version}"`);