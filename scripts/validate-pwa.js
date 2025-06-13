const fs = require('fs');
const path = require('path');

console.log('🔍 Validation PWA en cours...\n');

// Fonction pour valider un fichier JSON
function validateJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`✅ ${filePath} - JSON valide`);
    return true;
  } catch (error) {
    console.error(`❌ ${filePath} - JSON invalide:`, error.message);
    return false;
  }
}

// Fonction pour vérifier qu'un fichier existe
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${description} - ${filePath} (${(stats.size / 1024).toFixed(2)} KB)`);
    return true;
  } else {
    console.error(`❌ ${description} - ${filePath} manquant`);
    return false;
  }
}

// Vérifications des fichiers critiques
console.log('📋 Vérification des fichiers PWA...\n');

const criticalFiles = [
  { path: 'web-build/index.html', desc: 'Index HTML' },
  { path: 'web-build/manifest.json', desc: 'Manifest PWA' },
  { path: 'web-build/sw.js', desc: 'Service Worker' },
  { path: 'web-build/favicon.png', desc: 'Favicon 48x48' },
  { path: 'web-build/icon.png', desc: 'Icône 192x192' },
  { path: 'web-build/adaptive-icon.png', desc: 'Icône 512x512' }
];

let allFilesOK = true;

criticalFiles.forEach(({ path: filePath, desc }) => {
  if (!checkFile(filePath, desc)) {
    allFilesOK = false;
  }
});

console.log('\n📋 Validation JSON...\n');

// Valider le manifest.json
if (!validateJSON('web-build/manifest.json')) {
  allFilesOK = false;
}

// Vérifier la configuration Vercel
console.log('\n📋 Vérification configuration Vercel...\n');

if (checkFile('vercel.json', 'Configuration Vercel')) {
  if (!validateJSON('vercel.json')) {
    allFilesOK = false;
  } else {
    // Vérifier que les routes sont correctement configurées
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.routes) {
      const manifestRoute = vercelConfig.routes.find(route => route.src === '/manifest.json');
      const swRoute = vercelConfig.routes.find(route => route.src === '/sw.js');
      
      if (manifestRoute) {
        console.log('✅ Route manifest.json configurée');
      } else {
        console.error('❌ Route manifest.json manquante');
        allFilesOK = false;
      }
      
      if (swRoute) {
        console.log('✅ Route service worker configurée');
      } else {
        console.error('❌ Route service worker manquante');
        allFilesOK = false;
      }
    }
  }
}

// Vérifier le contenu de l'index.html
console.log('\n📋 Vérification index.html...\n');

if (fs.existsSync('web-build/index.html')) {
  const htmlContent = fs.readFileSync('web-build/index.html', 'utf8');
  
  const checks = [
    { test: htmlContent.includes('<link rel="manifest" href="/manifest.json"'), desc: 'Lien vers manifest.json' },
    { test: htmlContent.includes('serviceWorker'), desc: 'Enregistrement Service Worker' },
    { test: htmlContent.includes('theme-color'), desc: 'Couleur de thème' },
    { test: htmlContent.includes('apple-mobile-web-app'), desc: 'Métadonnées iOS' }
  ];
  
  checks.forEach(({ test, desc }) => {
    if (test) {
      console.log(`✅ ${desc}`);
    } else {
      console.error(`❌ ${desc} manquant`);
      allFilesOK = false;
    }
  });
}

// Vérifier la structure des répertoires Expo
console.log('\n📋 Vérification structure Expo...\n');

const expoFiles = [
  'web-build/_expo',
  'web-build/favicon.ico'
];

expoFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${filePath} présent`);
  } else {
    console.warn(`⚠️  ${filePath} manquant (optionnel)`);
  }
});

// Résumé final
console.log('\n' + '='.repeat(50));

if (allFilesOK) {
  console.log('🎉 VALIDATION RÉUSSIE !');
  console.log('✅ Tous les fichiers PWA sont présents et valides');
  console.log('✅ Configuration Vercel correcte');
  console.log('✅ Prêt pour le déploiement');
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. vercel deploy --prod');
  console.log('2. Tester l\'URL de production');
  console.log('3. Vérifier l\'installation PWA');
  
} else {
  console.log('❌ VALIDATION ÉCHOUÉE !');
  console.log('⚠️  Corrigez les erreurs avant de déployer');
  process.exit(1);
}

console.log('\n💡 Pour tester localement:');
console.log('- Servir web-build/ avec un serveur HTTP');
console.log('- Vérifier que manifest.json est accessible');
console.log('- Tester l\'installation PWA');

console.log('\n🔗 URLs à tester après déploiement:');
console.log('- https://votre-url.vercel.app/manifest.json');
console.log('- https://votre-url.vercel.app/sw.js');
console.log('- https://votre-url.vercel.app/favicon.png');
