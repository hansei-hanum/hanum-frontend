import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { ScreenHeader } from 'src/components';
import { SPORTS_TOTO_WEBVIEW_URL } from 'src/constants/sportsToTo';

export const TotoPredictScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
      <ScreenHeader
        style={{
          backgroundColor: '#FEFEFE',
        }}
        isItemBlack={true}
        title={'경기 예측하기'}
      />
      <WebView source={{ uri: `${SPORTS_TOTO_WEBVIEW_URL}/Predict` }} />
    </SafeAreaView>
  );
};
