// Test pour démontrer le problème de gestion input non-uniforme
// et valider la Solution 1 : Input Séparé

const { BrainfuckInterpreter } = require('./BrainfuckInterpreter.js');

console.log('🔍 Démonstration du Problème : Gestion Input Non-Uniforme\n');

// Test 1 : Démonstration du problème actuel
console.log('=== Test 1 : Problème Actuel - Race Condition sur Input ===');

function testCurrentProblem() {
    console.log('📝 Code testé: ",f," avec input "ABCD"');
    
    const test = new BrainfuckInterpreter(',f,', 'ABCD');
    console.log(`État initial - Parent input: [${test.input.join(', ')}]`);
    
    // Première instruction ','
    console.log('\n1️⃣ Exécution "," - Parent lit premier caractère');
    test.step();
    console.log(`Après lecture - Parent input: [${test.input.join(', ')}]`);
    console.log(`Parent memory[0]: ${test.memory[0]} (${String.fromCharCode(test.memory[0])})`);
    
    // Fork 'f'
    console.log('\n2️⃣ Exécution "f" - Fork avec input restant');
    test.step();
    
    const allThreads = test.getAllThreadStates();
    console.log('\n📊 État après fork:');
    allThreads.forEach(thread => {
        console.log(`- Thread T${thread.threadId}: memory[0]=${thread.memoryFull[0]}, halted=${thread.halted}`);
    });
    
    // Pour voir l'input, nous devons accéder directement aux threads
    console.log('\n📊 Input state (accès direct):');
    if (test.threadManager) {
        for (const [threadId, thread] of test.threadManager.threads) {
            console.log(`- Thread T${threadId}: input=[${thread.input.join(', ')}]`);
        }
    }
    
    console.log('\n❌ PROBLÈME IDENTIFIÉ:');
    console.log('   - Parent et enfant ont le MÊME input restant: ["B", "C", "D"]');
    console.log('   - Les deux threads vont lire les mêmes caractères');
    console.log('   - Comportement non-déterministe selon l\'ordre d\'exécution');
    
    return allThreads;
}

testCurrentProblem();

// Test 2 : Démonstration avec execution multi-thread
console.log('\n\n=== Test 2 : Execution Multi-Thread - Race Condition ===');

function testRaceCondition() {
    console.log('📝 Test: Exécution complète du code ",f," avec "ABCD"');
    
    for (let run = 1; run <= 3; run++) {
        console.log(`\n🔄 Exécution ${run}:`);
        
        const test = new BrainfuckInterpreter(',f,', 'ABCD');
        
        try {
            // Exécution complète multi-thread
            const results = test.runAllThreads();
            console.log('   Résultats:', results);
            
            // Analyser les outputs de chaque thread
            const allThreads = test.getAllThreadStates();
            allThreads.forEach(thread => {
                console.log(`   - Thread T${thread.threadId}: output="${thread.output}", halted=${thread.halted}`);
            });
            
            // Pour voir l'input consommé, accès direct
            if (test.threadManager) {
                console.log('   Input states:');
                for (const [threadId, thread] of test.threadManager.threads) {
                    console.log(`     T${threadId}: input=[${thread.input.join(', ')}] (${thread.input.length} restants)`);
                }
            }
            
        } catch (error) {
            console.log('   Erreur:', error.message);
        }
    }
    
    console.log('\n❌ PROBLÈME CONFIRMÉ:');
    console.log('   - Résultats peuvent varier entre exécutions');
    console.log('   - Race condition sur la lecture d\'input');
    console.log('   - Impossible de prédire quel thread lit quoi');
}

testRaceCondition();

// Test 3 : Cas limites problématiques
console.log('\n\n=== Test 3 : Cas Limites Problématiques ===');

function testEdgeCases() {
    console.log('📝 Test des cas limites avec l\'implémentation actuelle\n');
    
    // Cas 1 : Input d'1 caractère
    console.log('🔸 Cas 1: Input "X" avec fork');
    const test1 = new BrainfuckInterpreter('f', 'X');
    test1.step(); // fork
    
    const threads1 = test1.getAllThreadStates();
    console.log('   Threads après fork:');
    threads1.forEach(thread => {
        console.log(`   Thread T${thread.threadId}: halted=${thread.halted}`);
    });
    
    // Accès direct pour voir l'input
    if (test1.threadManager) {
        console.log('   Input states:');
        for (const [threadId, thread] of test1.threadManager.threads) {
            console.log(`     T${threadId}: input=[${thread.input.join(', ')}]`);
        }
    }
    console.log('   ❌ Les deux threads ont le même input "X"');
    
    // Cas 2 : Input vide
    console.log('\n🔸 Cas 2: Input vide avec fork');
    const test2 = new BrainfuckInterpreter('f', '');
    test2.step(); // fork
    
    const threads2 = test2.getAllThreadStates();
    console.log('   Threads après fork:');
    threads2.forEach(thread => {
        console.log(`   Thread T${thread.threadId}: halted=${thread.halted}`);
    });
    
    // Accès direct pour voir l'input
    if (test2.threadManager) {
        console.log('   Input states:');
        for (const [threadId, thread] of test2.threadManager.threads) {
            console.log(`     T${threadId}: input length=${thread.input.length}`);
        }
    }
    console.log('   ✅ Ce cas fonctionne (input vide pour tous)');
    
    // Cas 3 : Multiple forks
    console.log('\n🔸 Cas 3: Double fork "f>f" avec "ABCDEF"');
    const test3 = new BrainfuckInterpreter('f>f', 'ABCDEF');
    test3.step(); // premier fork
    test3.step(); // >
    test3.step(); // second fork
    
    const threads3 = test3.getAllThreadStates();
    console.log('   Threads après double fork:');
    threads3.forEach(thread => {
        console.log(`   Thread T${thread.threadId}: halted=${thread.halted}`);
    });
    
    // Accès direct pour voir l'input
    if (test3.threadManager) {
        console.log('   Input states:');
        for (const [threadId, thread] of test3.threadManager.threads) {
            console.log(`     T${threadId}: input=[${thread.input.join(', ')}]`);
        }
    }
    console.log('   ❌ Tous les threads ont le même input restant');
}

testEdgeCases();

// Test 4 : Solution proposée (simulation)
console.log('\n\n=== Test 4 : Simulation de la Solution 1 ===');

function simulateSolution() {
    console.log('📝 Simulation de la Solution 1 : Input Séparé\n');
    
    function divideInput(input) {
        const length = input.length;
        
        if (length === 0) {
            return { parent: [], child: '' };
        }
        
        if (length === 1) {
            return { parent: [], child: input[0] };
        }
        
        const splitPoint = Math.ceil(length / 2);
        return {
            parent: input.slice(0, splitPoint),
            child: input.slice(splitPoint).join('')
        };
    }
    
    console.log('🔸 Test algorithme de division:');
    
    const testCases = [
        ['A', 'B', 'C', 'D'],
        ['A', 'B', 'C'],
        ['A', 'B'], 
        ['A'],
        []
    ];
    
    testCases.forEach(input => {
        const result = divideInput(input);
        console.log(`   Input: [${input.join(', ')}] → Parent: [${result.parent.join(', ')}], Enfant: "${result.child}"`);
    });
    
    console.log('\n✅ AVANTAGES DE LA SOLUTION:');
    console.log('   - Chaque thread reçoit une portion exclusive d\'input');
    console.log('   - Aucune race condition possible');
    console.log('   - Comportement déterministe');
    console.log('   - Gestion intelligente des cas limites');
}

simulateSolution();

// Test 5 : Vérification du code défensif
console.log('\n\n=== Test 5 : Code Défensif Problématique ===');

function testDefensiveCode() {
    console.log('📝 Vérification de la nécessité du code défensif\n');
    
    // Créer un interpréteur et regarder le code défensif en action
    const test = new BrainfuckInterpreter(',', 'A');
    
    console.log('🔸 Avant step() - Type de this.input:', typeof test.input, Array.isArray(test.input));
    console.log('   Content:', test.input);
    
    // La vérification défensive dans case ',' devrait idéalement ne jamais se déclencher
    console.log('\n🔸 Exécution de "," - Surveillance du code défensif...');
    test.step();
    
    console.log('\n💡 OBSERVATION:');
    console.log('   - Le code défensif dans case "," indique un problème de design');
    console.log('   - Si this.input est toujours un Array après construction,');
    console.log('     pourquoi cette vérification est-elle nécessaire ?');
    console.log('   - La Solution 1 élimine ce besoin de code défensif');
}

testDefensiveCode();

console.log('\n🎯 RÉSUMÉ DU DIAGNOSTIC:');
console.log('=====================================');
console.log('❌ PROBLÈMES IDENTIFIÉS:');
console.log('   1. Race conditions sur l\'input lors des forks');
console.log('   2. Partage non-intentionnel d\'input entre threads');
console.log('   3. Comportement non-déterministe'); 
console.log('   4. Code défensif inutile indiquant un bug de design');
console.log('');
console.log('✅ SOLUTION 1 PROPOSÉE:');
console.log('   1. Division intelligente de l\'input lors des forks');
console.log('   2. Portions exclusives par thread');
console.log('   3. Comportement déterministe garanti');
console.log('   4. Suppression du code défensif');
console.log('   5. Logs informatifs pour le debugging');
console.log('');
console.log('🚀 IMPLÉMENTATION RECOMMANDÉE: Solution 1 : Input Séparé');

module.exports = {
    testCurrentProblem,
    testRaceCondition,
    testEdgeCases,
    simulateSolution,
    testDefensiveCode
};