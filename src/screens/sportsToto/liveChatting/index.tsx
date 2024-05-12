import React from 'react';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useAppBridge } from 'src/hooks';

export const TotoLiveChattingScreen: React.FC = () => {
  const { WebView } = useAppBridge({ screenName: 'TotoPredict' });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFzZGYiLCJ2YWxpZGF0aW9uU3RyaW5nIjoiQXNkZiJ9.mB5tb7ZCJKgOQoNxscZPD8JVU40tmoht8Wg525EBX60';

  return (
    <WebView
      source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/live-chatting` }}
      injectedJavaScriptBeforeContentLoaded={`localStorage.setItem('token', '${token}');`}
    />
  );
};
