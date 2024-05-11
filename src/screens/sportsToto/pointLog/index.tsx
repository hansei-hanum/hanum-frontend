import React from 'react';

import { bridge, createWebView } from '@webview-bridge/react-native';
import { useSetRecoilState } from 'recoil';

import { sportsTotoTitleAtom } from 'src/atoms';
import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useNavigate } from 'src/hooks';

type AppBridgeState = {
  goToPointLogScreen: () => Promise<void>;
};

export const PointLogScreen: React.FC = () => {
  const navigate = useNavigate();
  const setSportsTotoTileAtom = useSetRecoilState(sportsTotoTitleAtom);

  const appBridge = bridge<AppBridgeState>(() => ({
    goToPointLogScreen: async () => {
      await setSportsTotoTileAtom('포인트 순위');
      navigate('Ranking');
    },
  }));

  const { WebView } = createWebView({
    bridge: appBridge,
    debug: true,
  });

  return <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/pointLog` }} />;
};
