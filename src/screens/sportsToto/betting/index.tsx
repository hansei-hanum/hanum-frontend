import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';

export const BettingScreen: React.FC = () => {
  return <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/betting` }} />;
};
