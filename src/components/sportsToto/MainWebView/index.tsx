import React from 'react';
import WebView from 'react-native-webview';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';

export const TotoMainWebView: React.FC = () => {
  return <WebView source={{ uri: SPORTS_TOTO_WEBVIEW_URL }} />;
};
