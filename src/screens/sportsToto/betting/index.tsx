import { Text } from '@react-native-material/core';
import React from 'react';
import WebView from 'react-native-webview';

export const BettingScreen: React.FC = () => {
  return <WebView source={{ uri: 'http://localhost:5173/betting' }} />;
};
