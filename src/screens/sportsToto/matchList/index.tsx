import React from 'react';

import { createWebView, bridge } from '@webview-bridge/react-native';
import { useSetRecoilState } from 'recoil';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useNavigate } from 'src/hooks';
import { sportsTotoTitleAtom } from 'src/atoms';

type AppBridgeState = {
  goToPointLogScreen: () => Promise<void>;
};

export const MatchListScreen: React.FC = () => {
  const navigate = useNavigate();
  const setSportsTotoTileAtom = useSetRecoilState(sportsTotoTitleAtom);

  const appBridge = bridge<AppBridgeState>(() => ({
    goToPointLogScreen: async () => {
      await setSportsTotoTileAtom('포인트 순위');
      navigate('Ranking');
    },
  }));

  type AppBridge = typeof appBridge;

  const { WebView } = createWebView({
    bridge: appBridge,
    debug: true,
  });

  return <WebView source={{ uri: SPORTS_TOTO_WEBVIEW_URL }} />;
};
