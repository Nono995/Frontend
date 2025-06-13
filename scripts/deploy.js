const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement Af-MeD Prières PWA\n');

// Fonction pour exécuter une commande et afficher le résultat
function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`✅ ${description} terminé\n`);
    return result;
  } catch (error) {
    console.error(`❌ Erreur lors de ${description}:`);
    console.error(error.message);
    process.exit(1);
  }
}

// Vérifications préliminaires
console.log('🔍 Vérifications préliminaires...\n');

// Vérifier que nous sommes dans le bon répertoire
if (!fs.existsSync('package.json')) {
  console.error('❌ Erreur: package.json non trouvé. Assurez-vous d\'être dans le répertoire du projet.');
  process.exit(1);
}

// Vérifier que Vercel CLI est installé
try {
  execSync('vercel --version', { encoding: 'utf8' });
  console.log('✅ Vercel CLI détecté');
} catch (error) {
  console.error('❌ Vercel CLI non installé. Installez-le avec: npm install -g vercel');
  process.exit(1);
}

// Vérifier la configuration PWA
const requiredFiles = [
  'public/manifest.json',
  'public/sw.js',
  'vercel.json',
  'assets/favicon.png',
  'assets/icon.png',
  'assets/adaptive-icon.png'
];

console.log('🔍 Vérification des fichiers PWA...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ Fichier manquant: ${file}`);
    process.exit(1);
  }
}

console.log('\n🏗️ Début du processus de déploiement...\n');

// Étape 1: Build de production
runCommand('npm run vercel-build', 'Build de production avec configuration PWA');

// Étape 2: Vérifier que le build a réussi
if (!fs.existsSync('web-build')) {
  console.error('❌ Erreur: Le répertoire web-build n\'a pas été créé');
  process.exit(1);
}

// Vérifier les fichiers critiques dans web-build
const criticalFiles = [
  'web-build/index.html',
  'web-build/manifest.json',
  'web-build/sw.js',
  'web-build/favicon.png',
  'web-build/icon.png'
];

console.log('🔍 Vérification du build...');
for (const file of criticalFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ Fichier critique manquant: ${file}`);
    process.exit(1);
  }
}

console.log('\n📊 Statistiques du build:');
try {
  const stats = fs.statSync('web-build');
  console.log(`📁 Répertoire web-build créé: ${stats.birthtime}`);
  
  // Compter les fichiers
  const files = fs.readdirSync('web-build', { recursive: true });
  console.log(`📄 Nombre de fichiers: ${files.length}`);
  
  // Taille approximative
  let totalSize = 0;
  function calculateSize(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        calculateSize(fullPath);
      } else {
        totalSize += stat.size;
      }
    }
  }
  
  calculateSize('web-build');
  console.log(`💾 Taille totale: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
} catch (error) {
  console.log('⚠️ Impossible de calculer les statistiques');
}

console.log('\n🌐 Prêt pour le déploiement Vercel!');
console.log('\n📋 Prochaines étapes manuelles:');
console.log('1. Connectez-vous à Vercel: vercel login');
console.log('2. Déployez en preview: vercel deploy');
console.log('3. Déployez en production: vercel deploy --prod');

console.log('\n💡 Conseils:');
console.log('- Testez d\'abord avec "vercel deploy" (preview)');
console.log('- Une fois validé, utilisez "vercel deploy --prod"');
console.log('- L\'URL de production sera affichée après le déploiement');

console.log('\n🎯 Tests post-déploiement recommandés:');
console.log('- Test d\'installation PWA sur mobile');
console.log('- Audit Lighthouse sur l\'URL de production');
console.log('- Test du mode hors ligne');
console.log('- Vérification des performances');

console.log('\n✨ Build terminé avec succès! Prêt pour Vercel.');

// Optionnel: Ouvrir le répertoire web-build
if (process.platform === 'win32') {
  console.log('\n📂 Ouverture du répertoire web-build...');
  try {
    execSync('explorer web-build', { stdio: 'ignore' });
  } catch (error) {
    console.log('⚠️ Impossible d\'ouvrir le répertoire automatiquement');
  }
}
