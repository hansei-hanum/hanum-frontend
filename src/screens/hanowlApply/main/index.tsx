import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { Linking } from 'react-native';

import { useTheme } from '@emotion/react';

import { BottomSheet, GoBackIcon, Spinner } from 'src/components';
import { SCREEN_HEIGHT } from 'src/constants';
import { BottomSheetRefProps } from 'src/types';
import { isAndroid } from 'src/utils';

export type TeamId =
  | 'common'
  | 'tech'
  | 'design'
  | 'event'
  | 'safety'
  | 'account'
  | 'broadcast'
  | 'exercise'
  | 'book';

export const TEAM_TEXT_TO_ID: { [key: string]: TeamId } = {
  공통: 'common',
  기능부: 'tech',
  홍보부: 'design',
  행사기획부: 'event',
  안전부: 'safety',
  총무부: 'account',
  학예체육부: 'exercise',
  도서부: 'book',
  방송부: 'broadcast',
};

export const HanowlApplyMainScreen: React.FC = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT + 100);
  };
  const [message, setMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const insets = useSafeAreaInsets();

  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    setMessage(data);
    setIsLoaded(false);
    if (data !== 'null' && data !== null && data !== '') {
      openBottomSheet();
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (!navState.url.includes('https')) {
      return false;
    }
  };

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    if (!event.url.includes('http://172.30.1.18:3000/')) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };

  return (
    <>
      <GoBackIcon
        isWhite
        style={{
          position: 'absolute',
          top: insets.top,
          left: 10,
          zIndex: 999,
          marginTop: isAndroid ? 10 : 0,
        }}
      />
      <WebView
        source={{ uri: 'http://172.30.1.18:3000/' }}
        style={{ flex: 1, backgroundColor: 'black' }}
        onMessage={onMessage}
        injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
      />
      <BottomSheet
        ref={bottomSheetRef}
        scrollHeight={-SCREEN_HEIGHT + 100}
        style={{ backgroundColor: '#2A2B2E' }}
      >
        {!isLoaded && <Spinner color={theme.white} isCenter />}
        {isLoaded && (
          <WebView
            source={{ uri: `http://172.30.1.18:3000/teams/${message}` }}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            onNavigationStateChange={onNavigationStateChange}
            style={{ flex: 1, backgroundColor: '#2A2B2E', paddingBottom: isAndroid ? 20 : 0 }}
            injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </BottomSheet>
    </>
  );
};
