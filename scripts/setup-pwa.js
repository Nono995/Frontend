const fs = require('fs');
const path = require('path');

// Fonction pour copier un fichier
function copyFile(src, dest) {
  try {
    // Créer le répertoire de destination s'il n'existe pas
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copier le fichier
    fs.copyFileSync(src, dest);
    console.log(`✅ Copié: ${src} → ${dest}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la copie de ${src}:`, error.message);
  }
}

// Configuration des fichiers à copier
const filesToCopy = [
  // Manifest et service worker
  { src: 'public/manifest.json', dest: 'web-build/manifest.json' },
  { src: 'public/sw.js', dest: 'web-build/sw.js' },

  // Icônes
  { src: 'assets/favicon.png', dest: 'web-build/favicon.png' },
  { src: 'assets/icon.png', dest: 'web-build/icon.png' },
  { src: 'assets/adaptive-icon.png', dest: 'web-build/adaptive-icon.png' },
  { src: 'assets/church-header.png', dest: 'web-build/church-header.png' }
];

// Fonction pour injecter les métadonnées PWA dans l'index.html
function injectPWAMetadata() {
  const indexPath = 'web-build/index.html';

  if (!fs.existsSync(indexPath)) {
    console.warn('⚠️  index.html non trouvé, impossible d\'injecter les métadonnées PWA');
    return;
  }

  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Métadonnées PWA à injecter
  const pwaMetadata = `
  <!-- PWA Métadonnées -->
  <meta name="application-name" content="Af-MeD Prières" />
  <meta name="apple-mobile-web-app-title" content="Af-MeD" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="mobile-web-app-capable" content="yes" />

  <!-- Couleurs et thème PWA -->
  <meta name="theme-color" content="#1a237e" />
  <meta name="msapplication-TileColor" content="#1a237e" />

  <!-- Icônes PWA -->
  <link rel="apple-touch-icon" sizes="192x192" href="/icon.png" />
  <link rel="apple-touch-icon" sizes="512x512" href="/adaptive-icon.png" />

  <!-- Manifest PWA -->
  <link rel="manifest" href="/manifest.json" />

  <!-- Service Worker -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            console.log('Service Worker enregistré:', registration.scope);
          })
          .catch(function(error) {
            console.log('Erreur Service Worker:', error);
          });
      });
    }
  </script>`;

  // Vérifier si les métadonnées PWA sont déjà présentes
  if (htmlContent.includes('<!-- PWA Métadonnées -->')) {
    console.log('✅ Métadonnées PWA déjà présentes dans index.html');
    return;
  }

  // Injecter avant la fermeture de </head>
  if (htmlContent.includes('</head>')) {
    htmlContent = htmlContent.replace('</head>', pwaMetadata + '\n</head>');
    fs.writeFileSync(indexPath, htmlContent);
    console.log('✅ Métadonnées PWA injectées dans index.html');
  } else {
    console.warn('⚠️  Impossible de trouver </head> dans index.html');
  }
}

console.log('🚀 Configuration PWA en cours...\n');

// Vérifier si le répertoire web-build existe
if (!fs.existsSync('web-build')) {
  console.log('📁 Création du répertoire web-build...');
  fs.mkdirSync('web-build', { recursive: true });
}

// Copier tous les fichiers
filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    copyFile(src, dest);
  } else {
    console.warn(`⚠️  Fichier source non trouvé: ${src}`);
  }
});

// Vérifier que l'index.html d'Expo existe
if (!fs.existsSync('web-build/index.html')) {
  console.error('❌ Erreur: index.html généré par Expo non trouvé. Assurez-vous d\'exécuter expo export d\'abord.');
  process.exit(1);
}

// Injecter les métadonnées PWA dans l'index.html
injectPWAMetadata();

// Créer un fichier .htaccess pour Apache (optionnel)
const htaccessContent = `# PWA Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Handle Angular and React Router
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive on
  
  # Cache static assets for 1 year
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  
  # Cache HTML for 1 hour
  ExpiresByType text/html "access plus 1 hour"
  
  # Don't cache service worker
  ExpiresByType application/javascript "access plus 0 seconds"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  
  # Service Worker specific headers
  <FilesMatch "sw\.js$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
  </FilesMatch>
</IfModule>`;

try {
  fs.writeFileSync('web-build/.htaccess', htaccessContent);
  console.log('✅ Fichier .htaccess créé');
} catch (error) {
  console.error('❌ Erreur lors de la création du .htaccess:', error.message);
}

console.log('\n🎉 Configuration PWA terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Exécutez: npm run vercel-build');
console.log('2. Testez votre PWA sur: http://localhost:3000');
console.log('3. Déployez sur Vercel ou votre hébergeur');
console.log('\n💡 Pour tester l\'installation PWA:');
console.log('- Ouvrez votre app dans Chrome/Edge');
console.log('- Cherchez l\'icône d\'installation dans la barre d\'adresse');
console.log('- Ou utilisez le menu "Installer l\'application"');
