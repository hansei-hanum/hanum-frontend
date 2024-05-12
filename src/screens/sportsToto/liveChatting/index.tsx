import React from 'react';

import { bridge, createWebView } from '@webview-bridge/react-native';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useNavigate } from 'src/hooks';

type AppBridgeState = {
  goToScreen: () => Promise<void>;
};

export const TotoLiveChattingScreen: React.FC = () => {
  const navigate = useNavigate();

  const appBridge = bridge<AppBridgeState>(() => ({
    goToScreen: async () => {
      await navigate('TotoPredict');
    },
  }));

  const { WebView } = createWebView({
    bridge: appBridge,
    debug: true,
  });

  return <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/liveChatting` }} />;
};
