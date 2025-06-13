# 📱 Af-MeD Prières - Progressive Web App (PWA)

## 🎯 Qu'est-ce qu'une PWA ?

Une Progressive Web App (PWA) est une application web qui peut être installée sur votre téléphone ou ordinateur comme une application native. Elle fonctionne dans votre navigateur mais offre une expérience similaire à une application mobile.

## ✨ Avantages de notre PWA

### 📲 Installation facile
- **Pas besoin de store** : Installez directement depuis votre navigateur
- **Espace de stockage minimal** : Plus léger qu'une app native
- **Mises à jour automatiques** : Toujours la dernière version

### 🚀 Performance optimisée
- **Chargement rapide** : Cache intelligent pour une navigation fluide
- **Fonctionnement hors ligne** : Accès aux contenus même sans internet
- **Interface native** : Expérience utilisateur optimisée pour mobile

### 🔔 Fonctionnalités avancées
- **Notifications push** : Recevez les dernières prières et messages
- **Raccourcis rapides** : Accès direct aux sections favorites
- **Mode plein écran** : Interface immersive sans barre de navigateur

## 📱 Comment installer l'application

### Sur Android (Chrome, Edge, Samsung Internet)

1. **Ouvrez votre navigateur** et allez sur le site
2. **Cherchez l'icône d'installation** dans la barre d'adresse (📥)
3. **Cliquez sur "Installer"** ou "Ajouter à l'écran d'accueil"
4. **Confirmez l'installation** dans la popup
5. **L'application apparaît** sur votre écran d'accueil

### Sur iPhone/iPad (Safari)

1. **Ouvrez Safari** et allez sur le site
2. **Appuyez sur le bouton de partage** (carré avec flèche vers le haut)
3. **Sélectionnez "Sur l'écran d'accueil"**
4. **Personnalisez le nom** si souhaité
5. **Appuyez sur "Ajouter"**

### Sur ordinateur (Chrome, Edge, Firefox)

1. **Ouvrez votre navigateur** et allez sur le site
2. **Cliquez sur l'icône d'installation** dans la barre d'adresse
3. **Ou utilisez le menu** : ⋮ → "Installer Af-MeD Prières"
4. **Confirmez l'installation**
5. **L'application s'ouvre** dans sa propre fenêtre

## 🛠️ Fonctionnalités techniques

### Cache intelligent
- **Stratégie Cache-First** pour les images et ressources statiques
- **Stratégie Network-First** pour les données dynamiques
- **Mise à jour automatique** du cache en arrière-plan

### Fonctionnement hors ligne
- **Contenu en cache** accessible sans connexion
- **Synchronisation automatique** quand la connexion revient
- **Indicateur de statut** réseau dans l'interface

### Optimisations performance
- **Lazy loading** des images et composants
- **Compression** des ressources
- **Préchargement** des contenus critiques

## 🎨 Interface adaptative

### Design responsive
- **Optimisé mobile** : Interface tactile intuitive
- **Tablette friendly** : Mise en page adaptée aux grands écrans
- **Desktop ready** : Expérience complète sur ordinateur

### Thème cohérent
- **Couleurs de marque** : Identité visuelle Af-MeD
- **Typographie optimisée** : Lisibilité sur tous les écrans
- **Animations fluides** : Transitions naturelles

## 🔧 Pour les développeurs

### Structure du projet
```
├── public/
│   ├── manifest.json      # Configuration PWA
│   └── sw.js             # Service Worker
├── components/
│   ├── PWAInstallPrompt.tsx  # Composant d'installation
│   └── PWAStatus.tsx         # Indicateur de statut
├── utils/
│   └── pwaUtils.ts          # Utilitaires PWA
└── scripts/
    └── setup-pwa.js         # Script de configuration
```

### Commandes utiles
```bash
# Développement
npm run web                 # Démarrer en mode développement

# Build et déploiement
npm run build              # Build avec configuration PWA
npm run vercel-build       # Build pour Vercel
npm run setup-pwa          # Configuration PWA uniquement
```

### Tests PWA
1. **Lighthouse** : Audit PWA complet
2. **Chrome DevTools** : Application → Manifest
3. **Test d'installation** : Mode incognito recommandé

## 📊 Métriques et performance

### Scores Lighthouse visés
- **Performance** : 90+
- **Accessibilité** : 95+
- **Bonnes pratiques** : 90+
- **SEO** : 90+
- **PWA** : 100

### Optimisations appliquées
- **Code splitting** : Chargement par chunks
- **Tree shaking** : Élimination du code inutile
- **Image optimization** : Formats modernes et compression
- **Critical CSS** : Styles critiques inline

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm run vercel-build
vercel deploy
```

### Autres hébergeurs
1. **Build** : `npm run build`
2. **Upload** : Contenu du dossier `web-build/`
3. **Configuration** : Servir `index.html` pour toutes les routes

## 📞 Support

Pour toute question ou problème :
- **Email** : support@afmed.org
- **Documentation** : Consultez ce README
- **Issues** : Créez un ticket sur le repository

---

*Af-MeD Prières - Une communauté de foi connectée* 🙏
