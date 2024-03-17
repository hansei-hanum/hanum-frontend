import React from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { Linking } from 'react-native';

import { Theme } from '@emotion/react';

import { isAndroid } from 'src/utils';
import { Button, Text } from 'src/components/common';
import { HANOWL_APPLY } from 'src/constants';
import { useCheckApplyPeriod } from 'src/hooks';

import * as S from './styled';

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
  theme: Theme;
  onPress: () => void;
}

export const TeamsWebView: React.FC<TeamsWebViewProps> = ({
  message,
  teamLoading,
  theme,
  onPress,
}) => {
  const { isApplyPeriod, time } = useCheckApplyPeriod();

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (!navState.url.includes('https')) {
      return false;
    }
  };

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    if (!event.url.includes(HANOWL_APPLY.URL)) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };

  return (
    <>
      <WebView
        source={{ uri: `${HANOWL_APPLY.URL}teams/${message}` }}
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
        nestedScrollEnabled={true}
      />
      <S.TeamApplyButtonWrapper>
        <Button
          onPress={onPress}
          style={{
            paddingVertical: 14,
            opacity: 1,
            backgroundColor: isApplyPeriod ? theme.primary : theme.placeholder,
          }}
          activeOpacity={1}
          isDisabled={!isApplyPeriod}
        >
          <Text size={16} isCenter color={theme.white}>
            {isApplyPeriod
              ? `${TEAM_ID_TO_TEXT[message as TeamId]} 지원하기`
              : `모집 시작까지 ${time} 남았어요`}
          </Text>
        </Button>
      </S.TeamApplyButtonWrapper>
    </>
  );
};
