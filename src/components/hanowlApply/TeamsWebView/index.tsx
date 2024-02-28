import React from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { Linking } from 'react-native';

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

export const TEAM_ID_TO_TEXT: { [key in TeamId]: string } = {
  common: '공통',
  tech: '기능부',
  design: '홍보부',
  event: '행사기획부',
  safety: '안전부',
  account: '총무부',
  exercise: '학예체육부',
  book: '도서부',
  broadcast: '방송부',
};

export interface TeamsWebViewProps {
  teamLoading: boolean;
  message: string | null;
}

export const TeamsWebView: React.FC<TeamsWebViewProps> = ({ message, teamLoading }) => {
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
    <WebView
      source={{ uri: `http://172.30.1.18:3000/teams/${message}` }}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onNavigationStateChange={onNavigationStateChange}
      style={{
        backgroundColor: '#2A2B2E',
      }}
      containerStyle={{
        flex: teamLoading ? 0 : 0.8,
        paddingBottom: isAndroid ? 20 : 0,
      }}
      injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};
