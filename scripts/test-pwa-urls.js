const https = require('https');
const http = require('http');

// URL de base de votre application
const BASE_URL = 'http://localhost:59108';

// URLs à tester
const urlsToTest = [
  { path: '/', description: 'Page principale', expectedType: 'text/html' },
  { path: '/manifest.json', description: 'Manifest PWA', expectedType: 'application/json' },
  { path: '/sw.js', description: 'Service Worker', expectedType: 'application/javascript' },
  { path: '/favicon.png', description: 'Favicon 48x48', expectedType: 'image/png' },
  { path: '/icon.png', description: 'Icône 192x192', expectedType: 'image/png' },
  { path: '/adaptive-icon.png', description: 'Icône 512x512', expectedType: 'image/png' }
];

console.log('🧪 Test des URLs PWA en cours...\n');
console.log(`🔗 Base URL: ${BASE_URL}\n`);

// Fonction pour tester une URL
function testUrl(url, description, expectedType) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'] || '';
      
      let result = {
        url,
        description,
        statusCode,
        contentType,
        success: false,
        message: ''
      };
      
      if (statusCode === 200) {
        if (expectedType && contentType.includes(expectedType)) {
          result.success = true;
          result.message = `✅ ${description} - OK (${statusCode}, ${contentType})`;
        } else if (!expectedType) {
          result.success = true;
          result.message = `✅ ${description} - OK (${statusCode})`;
        } else {
          result.message = `⚠️  ${description} - Type incorrect (${statusCode}, attendu: ${expectedType}, reçu: ${contentType})`;
        }
      } else {
        result.message = `❌ ${description} - Erreur ${statusCode}`;
      }
      
      console.log(result.message);
      resolve(result);
    });
    
    req.on('error', (error) => {
      const result = {
        url,
        description,
        success: false,
        message: `❌ ${description} - Erreur réseau: ${error.message}`
      };
      console.log(result.message);
      resolve(result);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      const result = {
        url,
        description,
        success: false,
        message: `❌ ${description} - Timeout`
      };
      console.log(result.message);
      resolve(result);
    });
  });
}

// Fonction principale de test
async function runTests() {
  const results = [];
  
  for (const { path, description, expectedType } of urlsToTest) {
    const fullUrl = BASE_URL + path;
    const result = await testUrl(fullUrl, description, expectedType);
    results.push(result);
    
    // Petite pause entre les requêtes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Résumé des résultats
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`✅ Tests réussis: ${successful}/${total}`);
  
  if (successful === total) {
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !');
    console.log('✅ Votre PWA est correctement déployée');
    console.log('✅ Tous les fichiers PWA sont accessibles');
    console.log('✅ Les types de contenu sont corrects');
    
    console.log('\n📱 Prêt pour l\'installation PWA !');
    console.log('\n🧪 Tests recommandés:');
    console.log('1. Ouvrir l\'URL dans Chrome/Edge');
    console.log('2. Vérifier l\'icône d\'installation (📥)');
    console.log('3. Tester l\'installation PWA');
    console.log('4. Audit Lighthouse PWA');
    
  } else {
    console.log('\n⚠️  CERTAINS TESTS ONT ÉCHOUÉ');
    console.log('❌ Vérifiez la configuration Vercel');
    console.log('❌ Contrôlez les routes dans vercel.json');
    
    const failed = results.filter(r => !r.success);
    console.log('\n❌ Tests échoués:');
    failed.forEach(result => {
      console.log(`   - ${result.description}: ${result.url}`);
    });
  }
  
  console.log('\n🔗 URLs testées:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`   ${status} ${result.url}`);
  });
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Tester l\'installation PWA sur différents appareils');
  console.log('2. Vérifier le fonctionnement hors ligne');
  console.log('3. Partager l\'URL avec votre communauté');
  
  console.log(`\n🌟 URL finale: ${BASE_URL}`);
}

// Exécuter les tests
runTests().catch(console.error);
