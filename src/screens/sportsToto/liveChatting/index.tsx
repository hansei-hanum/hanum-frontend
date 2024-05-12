import React from 'react';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useAppBridge } from 'src/hooks';

export const TotoLiveChattingScreen: React.FC = () => {
  const { WebView } = useAppBridge({ screenName: 'TotoPredict' });

  return <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/live-chatting` }} />;
};
