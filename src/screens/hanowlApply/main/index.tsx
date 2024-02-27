import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { GoBackIcon } from 'src/components';

export const HanowlApplyMainScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <GoBackIcon style={{ position: 'absolute', top: insets.top, left: 10, zIndex: 999 }} />
      <WebView
        source={{ uri: 'http://172.30.1.18:3000/' }}
        style={{ flex: 1, backgroundColor: 'dark' }}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
        injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
      />
    </>
  );
};
