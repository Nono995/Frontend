import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { initializePWA, installPWA, isPWAInstallable, isPWAInstalled } from '../utils/pwaUtils';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onInstall, onDismiss }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Initialiser PWA seulement sur web
    if (Platform.OS === 'web') {
      initializePWA();

      // Écouter les événements PWA
      const handleInstallable = () => {
        if (!isPWAInstalled()) {
          setShowPrompt(true);
        }
      };

      const handleInstalled = () => {
        setShowPrompt(false);
        setIsInstalling(false);
        onInstall?.();
        
        Alert.alert(
          'Installation réussie !',
          'Af-MeD Prières a été installée sur votre appareil. Vous pouvez maintenant y accéder depuis votre écran d\'accueil.',
          [{ text: 'Parfait !', style: 'default' }]
        );
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('pwa-installable', handleInstallable);
        window.addEventListener('pwa-installed', handleInstalled);

        // Vérifier immédiatement si installable
        if (isPWAInstallable()) {
          setShowPrompt(true);
        }

        return () => {
          window.removeEventListener('pwa-installable', handleInstallable);
          window.removeEventListener('pwa-installed', handleInstalled);
        };
      }
    }
  }, [onInstall]);

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const success = await installPWA();
      
      if (!success) {
        setIsInstalling(false);
        Alert.alert(
          'Installation annulée',
          'L\'installation a été annulée. Vous pouvez réessayer plus tard.',
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      setIsInstalling(false);
      console.error('Erreur lors de l\'installation PWA:', error);
      Alert.alert(
        'Erreur d\'installation',
        'Une erreur s\'est produite lors de l\'installation. Veuillez réessayer.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    onDismiss?.();
  };

  // Ne pas afficher sur mobile natif ou si déjà installé
  if (Platform.OS !== 'web' || !showPrompt || isPWAInstalled()) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.promptCard}>
        <View style={styles.header}>
          <Ionicons name="phone-portrait-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.title}>Installer l'application</Text>
          <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
            <Ionicons name="close" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>
          Installez Af-MeD Prières sur votre appareil pour un accès rapide et une meilleure expérience.
        </Text>
        
        <View style={styles.benefits}>
          <View style={styles.benefit}>
            <Ionicons name="flash-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.benefitText}>Accès rapide depuis l'écran d'accueil</Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons name="wifi-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.benefitText}>Fonctionne même hors ligne</Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons name="notifications-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.benefitText}>Notifications push</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.dismissButton} 
            onPress={handleDismiss}
          >
            <Text style={styles.dismissText}>Plus tard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.installButton, isInstalling && styles.installing]} 
            onPress={handleInstall}
            disabled={isInstalling}
          >
            {isInstalling ? (
              <Text style={styles.installText}>Installation...</Text>
            ) : (
              <>
                <Ionicons name="download-outline" size={16} color="white" />
                <Text style={styles.installText}>Installer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  promptCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 8,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  benefits: {
    marginBottom: 16,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dismissButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dismissText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  installButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  installing: {
    opacity: 0.7,
  },
  installText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default PWAInstallPrompt;
