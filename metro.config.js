const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuration pour PWA
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
