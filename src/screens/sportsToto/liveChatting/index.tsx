import React from 'react';

import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useAppBridge } from 'src/hooks';

export const TotoLiveChattingScreen: React.FC = () => {
  const { WebView } = useAppBridge({ screenName: 'TotoPredict' });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ilx1ZDY0ZFx1YWUzOFx1YjNkOSIsInZhbGlkYXRpb25TdHJpbmciOiJcdWIyOTBcdWFlMDhcdWI5YzgifQ.XrZz6olEG-k6NoHT5aBIl88igmZgJO6q9LqEndCXckU';

  return (
    <WebView
      source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/live-chatting` }}
      injectedJavaScriptBeforeContentLoaded={`localStorage.setItem('token', '${token}');`}
    />
  );
};
