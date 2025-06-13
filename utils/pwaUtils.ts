// Utilitaires PWA pour Af-MeD Prières
import { Platform } from 'react-native';

// Interface pour les événements PWA
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// État de l'installation PWA
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let isInstallable = false;

// Vérifier si l'application est déjà installée
export const isPWAInstalled = (): boolean => {
  if (Platform.OS !== 'web') return false;
  
  // Vérifier si l'app est en mode standalone
  if (typeof window !== 'undefined') {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }
  
  return false;
};

// Vérifier si l'installation PWA est disponible
export const isPWAInstallable = (): boolean => {
  return isInstallable && !isPWAInstalled();
};

// Initialiser les événements PWA
export const initializePWA = (): void => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  // Écouter l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    console.log('PWA: beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    isInstallable = true;
    
    // Déclencher un événement personnalisé pour notifier l'app
    window.dispatchEvent(new CustomEvent('pwa-installable'));
  });

  // Écouter l'événement appinstalled
  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installée avec succès');
    deferredPrompt = null;
    isInstallable = false;
    
    // Déclencher un événement personnalisé
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  });

  // Enregistrer le service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker enregistré:', registration.scope);
        
        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                window.dispatchEvent(new CustomEvent('pwa-update-available'));
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Erreur Service Worker:', error);
      });
  }
};

// Déclencher l'installation PWA
export const installPWA = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    console.log('PWA: Aucune invite d\'installation disponible');
    return false;
  }

  try {
    // Afficher l'invite d'installation
    await deferredPrompt.prompt();
    
    // Attendre la réponse de l'utilisateur
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA: Installation acceptée');
      return true;
    } else {
      console.log('PWA: Installation refusée');
      return false;
    }
  } catch (error) {
    console.error('PWA: Erreur lors de l\'installation:', error);
    return false;
  } finally {
    deferredPrompt = null;
    isInstallable = false;
  }
};

// Vérifier si l'app fonctionne hors ligne
export const isOnline = (): boolean => {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return true;
  return navigator.onLine;
};

// Écouter les changements de statut réseau
export const addNetworkListener = (callback: (isOnline: boolean) => void): (() => void) => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Retourner une fonction de nettoyage
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Mettre à jour le service worker
export const updateServiceWorker = (): void => {
  if (Platform.OS !== 'web' || !('serviceWorker' in navigator)) return;

  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      registration.update();
    }
  });
};

// Obtenir des informations sur l'installation
export const getPWAInfo = () => {
  return {
    isInstalled: isPWAInstalled(),
    isInstallable: isPWAInstallable(),
    isOnline: isOnline(),
    platform: Platform.OS,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };
};
