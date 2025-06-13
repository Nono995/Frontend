# 🧪 Guide de Test PWA - Af-MeD Prières

## 🎯 Tests à effectuer

### 1. **Test de base dans le navigateur**

✅ **Étapes :**
1. Ouvrir http://localhost:8081 dans Chrome/Edge
2. Vérifier que l'application se charge correctement
3. Tester la navigation entre les onglets
4. Vérifier la responsivité sur différentes tailles d'écran

### 2. **Test du Manifest PWA**

✅ **Dans Chrome DevTools :**
1. Ouvrir F12 (Outils de développement)
2. Aller dans l'onglet **Application**
3. Cliquer sur **Manifest** dans la sidebar
4. Vérifier que toutes les informations sont correctes :
   - Nom : "Af-MeD Prières"
   - Nom court : "Af-MeD"
   - Description complète
   - Icônes (48px, 192px, 512px)
   - Mode d'affichage : "standalone"

### 3. **Test du Service Worker**

✅ **Dans Chrome DevTools :**
1. Onglet **Application** → **Service Workers**
2. Vérifier que le service worker est enregistré
3. Tester le cache :
   - Onglet **Application** → **Storage** → **Cache Storage**
   - Vérifier que "afmed-prieres-v1.0.0" existe
   - Voir les fichiers mis en cache

### 4. **Test d'installation PWA**

#### **Sur ordinateur (Chrome/Edge) :**
✅ **Méthode 1 - Icône d'installation :**
1. Chercher l'icône d'installation (📥) dans la barre d'adresse
2. Cliquer dessus
3. Confirmer l'installation
4. Vérifier que l'app s'ouvre dans sa propre fenêtre

✅ **Méthode 2 - Menu navigateur :**
1. Menu ⋮ → "Installer Af-MeD Prières"
2. Confirmer l'installation

#### **Sur mobile Android (Chrome) :**
✅ **Test mobile :**
1. Ouvrir l'URL sur votre téléphone Android
2. Chercher la bannière d'installation en bas
3. Ou menu ⋮ → "Ajouter à l'écran d'accueil"
4. Vérifier l'icône sur l'écran d'accueil

#### **Sur iPhone/iPad (Safari) :**
✅ **Test iOS :**
1. Ouvrir l'URL dans Safari
2. Bouton partage (⬆️) → "Sur l'écran d'accueil"
3. Personnaliser le nom si nécessaire
4. Confirmer l'ajout

### 5. **Test du mode hors ligne**

✅ **Étapes :**
1. Ouvrir l'application et naviguer
2. Dans DevTools → **Network** → Cocher "Offline"
3. Recharger la page
4. Vérifier que l'app fonctionne toujours
5. Tester la navigation entre les sections

### 6. **Test Lighthouse PWA**

✅ **Audit complet :**
1. DevTools → **Lighthouse**
2. Sélectionner "Progressive Web App"
3. Cliquer "Generate report"
4. Vérifier les scores :
   - PWA : 100 (objectif)
   - Performance : 90+ (objectif)
   - Accessibilité : 95+ (objectif)

## 🚀 Déploiement sur Vercel

### **Préparation du déploiement :**

1. **Installer Vercel CLI :**
```bash
npm install -g vercel
```

2. **Build de production :**
```bash
npm run vercel-build
```

3. **Connexion à Vercel :**
```bash
vercel login
```

4. **Déploiement :**
```bash
vercel deploy
```

5. **Déploiement en production :**
```bash
vercel deploy --prod
```

### **Configuration Vercel automatique :**

Le fichier `vercel.json` est déjà configuré pour :
- ✅ Build automatique avec `@vercel/static-build`
- ✅ Routage SPA (Single Page Application)
- ✅ Cache du service worker optimisé
- ✅ Servir tous les fichiers statiques

## 📱 Test post-déploiement

### **Une fois déployé sur Vercel :**

1. **Test sur différents appareils :**
   - Android (Chrome, Samsung Internet, Edge)
   - iPhone/iPad (Safari)
   - Ordinateur (Chrome, Edge, Firefox)

2. **Test d'installation depuis l'URL de production :**
   - Partager l'URL avec des testeurs
   - Vérifier l'installation sur différents appareils
   - Tester les notifications (si activées)

3. **Test de performance en production :**
   - Lighthouse audit sur l'URL de production
   - Test de vitesse de chargement
   - Test du cache et mode hors ligne

## 🔧 Résolution de problèmes

### **Problèmes courants :**

❌ **Service Worker ne s'enregistre pas :**
- Vérifier que le fichier `sw.js` est accessible
- Contrôler la console pour les erreurs
- S'assurer que l'app est servie en HTTPS (en production)

❌ **Icône d'installation n'apparaît pas :**
- Vérifier le manifest.json
- S'assurer que toutes les icônes existent
- Tester en mode incognito

❌ **App ne fonctionne pas hors ligne :**
- Vérifier le cache dans DevTools
- Contrôler la stratégie de cache du service worker
- Tester avec différents types de contenu

## 📊 Métriques de succès

### **Critères de validation :**

✅ **Installation :**
- [ ] Icône d'installation visible
- [ ] Installation réussie sur mobile et desktop
- [ ] App s'ouvre en mode standalone

✅ **Performance :**
- [ ] Score Lighthouse PWA : 100
- [ ] Chargement initial < 3 secondes
- [ ] Navigation fluide

✅ **Fonctionnalités :**
- [ ] Mode hors ligne fonctionnel
- [ ] Cache intelligent actif
- [ ] Responsive design validé

✅ **Compatibilité :**
- [ ] Chrome/Edge (Android/Desktop)
- [ ] Safari (iOS/macOS)
- [ ] Firefox (Desktop)

## 🎉 Checklist finale

Avant de considérer le test terminé :

- [ ] Application accessible sur localhost:8081
- [ ] Manifest PWA validé dans DevTools
- [ ] Service Worker enregistré et fonctionnel
- [ ] Installation testée sur au moins 2 appareils
- [ ] Mode hors ligne validé
- [ ] Audit Lighthouse PWA passé
- [ ] Build de production réussi
- [ ] Déploiement Vercel configuré

---

**🚀 Prêt pour le déploiement en production !**
