const fs = require('fs');
const path = require('path');

console.log('🎨 Guide de génération d\'icônes PWA optimisées\n');

// Configuration des icônes requises
const iconSizes = [
  { size: 48, name: 'favicon.png', purpose: 'any' },
  { size: 72, name: 'icon-72.png', purpose: 'any' },
  { size: 96, name: 'icon-96.png', purpose: 'any' },
  { size: 128, name: 'icon-128.png', purpose: 'any' },
  { size: 144, name: 'icon-144.png', purpose: 'any' },
  { size: 152, name: 'icon-152.png', purpose: 'any' },
  { size: 192, name: 'icon-192.png', purpose: 'any maskable' },
  { size: 384, name: 'icon-384.png', purpose: 'any maskable' },
  { size: 512, name: 'icon-512.png', purpose: 'any maskable' }
];

console.log('📋 Icônes PWA requises pour une intégration parfaite:\n');

iconSizes.forEach(({ size, name, purpose }) => {
  const purposeText = purpose.includes('maskable') ? '🎯 MASKABLE' : '📱 Standard';
  console.log(`   ${size}x${size}px - ${name} - ${purposeText}`);
});

console.log('\n🎯 ICÔNES MASKABLE - Règles importantes:\n');

console.log('1. **Zone de sécurité (Safe Zone)**');
console.log('   - Votre logo doit occuper seulement 80% du centre');
console.log('   - 10% de marge de chaque côté');
console.log('   - Exemple pour 192px : logo dans un carré de 154px centré');

console.log('\n2. **Arrière-plan**');
console.log('   - Couleur unie qui représente votre marque');
console.log('   - Éviter le blanc (invisible sur certains fonds)');
console.log('   - Recommandé : #1a237e (votre couleur de thème)');

console.log('\n3. **Contenu**');
console.log('   - Logo simple et lisible');
console.log('   - Pas de texte trop petit');
console.log('   - Contraste élevé');

console.log('\n🛠️ OUTILS RECOMMANDÉS:\n');

console.log('**Option 1 : PWA Asset Generator (Automatique)**');
console.log('   - Site : https://www.pwabuilder.com/imageGenerator');
console.log('   - Upload votre logo');
console.log('   - Génère toutes les tailles automatiquement');
console.log('   - Inclut les versions maskable');

console.log('\n**Option 2 : Maskable.app (Spécialisé)**');
console.log('   - Site : https://maskable.app/editor');
console.log('   - Prévisualisation en temps réel');
console.log('   - Test sur différentes formes');
console.log('   - Export direct');

console.log('\n**Option 3 : Canva/Figma (Manuel)**');
console.log('   - Créer un carré de 512x512px');
console.log('   - Arrière-plan : #1a237e');
console.log('   - Logo centré dans 80% de l\'espace');
console.log('   - Exporter en différentes tailles');

console.log('\n📱 TEMPLATE POUR VOS ICÔNES:\n');

const template = {
  "512px": {
    "canvas": "512x512px",
    "background": "#1a237e",
    "logo_area": "410x410px centré",
    "safe_zone": "51px de marge de chaque côté"
  },
  "192px": {
    "canvas": "192x192px", 
    "background": "#1a237e",
    "logo_area": "154x154px centré",
    "safe_zone": "19px de marge de chaque côté"
  }
};

console.log(JSON.stringify(template, null, 2));

console.log('\n🎨 ÉTAPES DE CRÉATION:\n');

console.log('1. **Préparer votre logo**');
console.log('   - Format PNG avec transparence');
console.log('   - Haute résolution (minimum 512px)');
console.log('   - Design simple et reconnaissable');

console.log('\n2. **Créer l\'icône maskable 512px**');
console.log('   - Canvas : 512x512px');
console.log('   - Arrière-plan : #1a237e (votre couleur de thème)');
console.log('   - Logo : centré dans un carré de 410x410px');
console.log('   - Sauvegarder comme "icon-512-maskable.png"');

console.log('\n3. **Générer les autres tailles**');
console.log('   - Redimensionner l\'icône 512px');
console.log('   - Garder les proportions');
console.log('   - Sauvegarder chaque taille');

console.log('\n4. **Tester vos icônes**');
console.log('   - Aller sur https://maskable.app/editor');
console.log('   - Upload votre icône 512px');
console.log('   - Tester différentes formes');
console.log('   - Vérifier que le logo reste visible');

console.log('\n📁 STRUCTURE DE FICHIERS RECOMMANDÉE:\n');

const fileStructure = `
assets/
├── icon-original.png          (Votre logo source)
├── favicon.png                (48x48)
├── icon-72.png               (72x72)
├── icon-96.png               (96x96)
├── icon-128.png              (128x128)
├── icon-144.png              (144x144)
├── icon-152.png              (152x152)
├── icon-192.png              (192x192 - maskable)
├── icon-384.png              (384x384 - maskable)
└── icon-512.png              (512x512 - maskable)
`;

console.log(fileStructure);

console.log('\n⚡ MISE À JOUR AUTOMATIQUE DU MANIFEST:\n');

// Générer le nouveau manifest avec toutes les icônes
const newManifest = {
  "name": "Af-MeD Prières",
  "short_name": "Af-MeD",
  "description": "Écoutez les prières publiques et podcasts Af-MeD. Priez, partagez, et découvrez les intentions de la communauté.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#1a237e",
  "background_color": "#1a237e",
  "lang": "fr",
  "categories": ["lifestyle", "social", "entertainment"],
  "prefer_related_applications": false,
  "icons": [
    {
      "src": "/favicon.png",
      "type": "image/png",
      "sizes": "48x48",
      "purpose": "any"
    },
    {
      "src": "/icon-72.png",
      "type": "image/png", 
      "sizes": "72x72",
      "purpose": "any"
    },
    {
      "src": "/icon-96.png",
      "type": "image/png",
      "sizes": "96x96", 
      "purpose": "any"
    },
    {
      "src": "/icon-128.png",
      "type": "image/png",
      "sizes": "128x128",
      "purpose": "any"
    },
    {
      "src": "/icon-144.png",
      "type": "image/png",
      "sizes": "144x144",
      "purpose": "any"
    },
    {
      "src": "/icon-152.png",
      "type": "image/png",
      "sizes": "152x152",
      "purpose": "any"
    },
    {
      "src": "/icon-192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-384.png", 
      "type": "image/png",
      "sizes": "384x384",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "type": "image/png", 
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ]
};

// Sauvegarder le nouveau manifest
try {
  fs.writeFileSync('public/manifest-updated.json', JSON.stringify(newManifest, null, 2));
  console.log('✅ Nouveau manifest généré : public/manifest-updated.json');
} catch (error) {
  console.log('⚠️  Impossible de créer le manifest (normal si le dossier public n\'existe pas)');
}

console.log('\n🚀 PROCHAINES ÉTAPES:\n');

console.log('1. **Créer vos icônes** avec un des outils recommandés');
console.log('2. **Les placer dans le dossier assets/**');
console.log('3. **Mettre à jour le manifest.json**');
console.log('4. **Rebuilder et redéployer**');
console.log('5. **Tester l\'installation sur mobile**');

console.log('\n💡 CONSEIL PRO:\n');
console.log('Utilisez https://www.pwabuilder.com/imageGenerator pour générer');
console.log('automatiquement toutes les icônes à partir de votre logo !');

console.log('\n🎯 RÉSULTAT ATTENDU:\n');
console.log('✅ Icône sans bordures sur Android');
console.log('✅ Icône adaptée à la forme iOS'); 
console.log('✅ Intégration parfaite avec les autres apps');
console.log('✅ Aspect professionnel sur tous les appareils');

console.log('\n📱 Une fois terminé, votre app aura l\'air d\'une vraie app native !');
