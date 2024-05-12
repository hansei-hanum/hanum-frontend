import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from 'src/components';
import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';
import { useAppBridge } from 'src/hooks';

export const TotoPredictScreen: React.FC = () => {
  const { WebView } = useAppBridge({ screenName: 'TotoBetting' });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
      <ScreenHeader
        style={{
          backgroundColor: '#FEFEFE',
        }}
        isItemBlack={true}
        title={'경기 예측하기'}
      />
      <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/predict` }} />
    </SafeAreaView>
  );
};
