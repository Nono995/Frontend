import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { addNetworkListener, isOnline, isPWAInstalled } from '../utils/pwaUtils';

const PWAStatus: React.FC = () => {
  const [online, setOnline] = useState(true);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // État initial
      setOnline(isOnline());
      setInstalled(isPWAInstalled());

      // Écouter les changements de réseau
      const removeNetworkListener = addNetworkListener(setOnline);

      // Écouter l'installation PWA
      const handleInstalled = () => setInstalled(true);
      
      if (typeof window !== 'undefined') {
        window.addEventListener('pwa-installed', handleInstalled);
        
        return () => {
          removeNetworkListener();
          window.removeEventListener('pwa-installed', handleInstalled);
        };
      }

      return removeNetworkListener;
    }
  }, []);

  // Ne pas afficher sur mobile natif
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Statut de connexion */}
      <View style={[styles.statusItem, !online && styles.offline]}>
        <Ionicons 
          name={online ? "wifi" : "wifi-outline"} 
          size={12} 
          color={online ? theme.colors.success : theme.colors.error} 
        />
        <Text style={[styles.statusText, !online && styles.offlineText]}>
          {online ? 'En ligne' : 'Hors ligne'}
        </Text>
      </View>

      {/* Statut PWA */}
      {installed && (
        <View style={styles.statusItem}>
          <Ionicons 
            name="phone-portrait" 
            size={12} 
            color={theme.colors.primary} 
          />
          <Text style={styles.statusText}>Installée</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 16,
    flexDirection: 'row',
    zIndex: 100,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.white}95`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: `${theme.colors.border}50`,
  },
  offline: {
    backgroundColor: `${theme.colors.error}15`,
    borderColor: `${theme.colors.error}30`,
  },
  statusText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  offlineText: {
    color: theme.colors.error,
  },
});

export default PWAStatus;
