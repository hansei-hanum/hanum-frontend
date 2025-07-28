const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  resolver: {
    extraNodeModules: {
      src: path.resolve(__dirname, 'src'),
    },
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'png',
      'jpg',
      'jpeg',
      'bmp',
      'gif',
      'webp',
      'svg',
    ],
    sourceExts: defaultConfig.resolver.sourceExts,
  },
});
