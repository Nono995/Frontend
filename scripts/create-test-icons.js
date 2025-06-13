const fs = require('fs');
const path = require('path');

console.log('🎨 Création d\'icônes de test pour PWA\n');

// Vérifier si les icônes actuelles existent
const currentIcons = [
  'assets/favicon.png',
  'assets/icon.png', 
  'assets/adaptive-icon.png'
];

console.log('📋 Vérification des icônes actuelles:\n');

currentIcons.forEach(iconPath => {
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    console.log(`✅ ${iconPath} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${iconPath} - Manquant`);
  }
});

console.log('\n🔄 Création d\'icônes de test temporaires...\n');

// Créer des icônes de test simples en attendant les vraies
const testIconSizes = [
  { size: 72, name: 'icon-72.png' },
  { size: 96, name: 'icon-96.png' },
  { size: 128, name: 'icon-128.png' },
  { size: 144, name: 'icon-144.png' },
  { size: 152, name: 'icon-152.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 384, name: 'icon-384.png' },
  { size: 512, name: 'icon-512.png' }
];

// Fonction pour créer une icône SVG simple
function createTestIcon(size, name) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Arrière-plan avec couleur de thème -->
  <rect width="${size}" height="${size}" fill="#1a237e"/>
  
  <!-- Zone de sécurité (80% du centre) -->
  <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
  
  <!-- Logo simplifié Af-MeD -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Croix stylisée -->
    <rect x="-${size * 0.15}" y="-${size * 0.3}" width="${size * 0.3}" height="${size * 0.1}" fill="#ffffff" rx="${size * 0.02}"/>
    <rect x="-${size * 0.05}" y="-${size * 0.3}" width="${size * 0.1}" height="${size * 0.4}" fill="#ffffff" rx="${size * 0.02}"/>
    
    <!-- Texte Af-MeD -->
    <text x="0" y="${size * 0.25}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold">Af-MeD</text>
  </g>
  
  <!-- Indicateur de taille -->
  <text x="${size * 0.05}" y="${size * 0.95}" fill="#ffffff" font-family="Arial, sans-serif" font-size="${size * 0.08}" opacity="0.7">${size}px</text>
</svg>`;

  const svgPath = `assets/test-${name.replace('.png', '.svg')}`;
  
  try {
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ Créé: ${svgPath} (${size}x${size}px)`);
    return true;
  } catch (error) {
    console.log(`❌ Erreur: ${svgPath} - ${error.message}`);
    return false;
  }
}

// Créer les icônes de test
console.log('🎨 Génération des icônes de test SVG...\n');

testIconSizes.forEach(({ size, name }) => {
  createTestIcon(size, name);
});

console.log('\n📋 Instructions pour convertir en PNG:\n');

console.log('**Option 1 : Outil en ligne (Recommandé)**');
console.log('1. Aller sur https://convertio.co/svg-png/');
console.log('2. Upload les fichiers SVG depuis assets/');
console.log('3. Télécharger les PNG');
console.log('4. Renommer en supprimant "test-" du nom');

console.log('\n**Option 2 : PWA Builder (Automatique)**');
console.log('1. Aller sur https://www.pwabuilder.com/imageGenerator');
console.log('2. Upload votre logo original');
console.log('3. Couleur de fond: #1a237e');
console.log('4. Télécharger le pack complet');

console.log('\n**Option 3 : Inkscape (Local)**');
console.log('1. Installer Inkscape (gratuit)');
console.log('2. Ouvrir chaque SVG');
console.log('3. Exporter en PNG à la bonne taille');

console.log('\n🔄 Mise à jour rapide pour tester:\n');

// Copier les icônes existantes vers les nouveaux noms pour test immédiat
const quickUpdates = [
  { from: 'assets/icon.png', to: 'assets/icon-192.png' },
  { from: 'assets/adaptive-icon.png', to: 'assets/icon-512.png' },
  { from: 'assets/favicon.png', to: 'assets/icon-72.png' },
  { from: 'assets/favicon.png', to: 'assets/icon-96.png' },
  { from: 'assets/favicon.png', to: 'assets/icon-128.png' },
  { from: 'assets/favicon.png', to: 'assets/icon-144.png' },
  { from: 'assets/favicon.png', to: 'assets/icon-152.png' },
  { from: 'assets/adaptive-icon.png', to: 'assets/icon-384.png' }
];

console.log('📁 Copie temporaire des icônes existantes...\n');

quickUpdates.forEach(({ from, to }) => {
  if (fs.existsSync(from)) {
    try {
      fs.copyFileSync(from, to);
      console.log(`✅ Copié: ${from} → ${to}`);
    } catch (error) {
      console.log(`❌ Erreur: ${from} → ${to}`);
    }
  } else {
    console.log(`⚠️  Source manquante: ${from}`);
  }
});

console.log('\n🚀 Prochaines étapes:\n');

console.log('1. **Test immédiat possible:**');
console.log('   npm run build');
console.log('   serve -s web-build -l 3000');
console.log('   Tester sur votre téléphone');

console.log('\n2. **Pour des icônes optimales:**');
console.log('   - Créer de vraies icônes maskable avec PWA Builder');
console.log('   - Remplacer les fichiers temporaires');
console.log('   - Rebuilder et retester');

console.log('\n3. **Test sur téléphone:**');
console.log('   - Connecter téléphone au même WiFi');
console.log('   - Aller sur http://[IP-LOCAL]:3000');
console.log('   - Installer la PWA');
console.log('   - Vérifier l\'icône sur l\'écran d\'accueil');

console.log('\n💡 Les icônes temporaires permettent de tester immédiatement');
console.log('   la fonctionnalité PWA en attendant les vraies icônes !');

console.log('\n📱 Votre PWA est prête à être testée sur téléphone !');
