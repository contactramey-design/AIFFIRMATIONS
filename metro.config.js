const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// CRITICAL: Disable file watching to prevent EMFILE errors
// Use polling instead (slower but works)
config.watcher = {
  watchman: false, // Disable Watchman
  healthCheck: {
    enabled: false,
  },
};

// Only watch essential directories
config.watchFolders = [
  __dirname,
];

// Note: Do not blockList node_modules or Metro cannot resolve expo-router/entry.js for export

module.exports = withNativeWind(config, { input: './global.css' });
