/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  extends: '@react-native/metro-config',
};
