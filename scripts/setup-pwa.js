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
  { src: 'assets/church-header.png', dest: 'web-build/church-header.png' },
  
  // Template HTML (sera utilisé par Expo)
  { src: 'web/index.html', dest: 'web-build/index.html' }
];

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
