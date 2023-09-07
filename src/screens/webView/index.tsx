import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

import { GoBackIcon, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const WebViewScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('읽어들이는 중..');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('isLoading changed to ' + isLoading);
  }, [isLoading]);

  return (
    <S.WebViewSafeContainer>
      <S.HeaderContainer>
        <GoBackIcon style={{ position: 'absolute', left: 0, top: 0 }} />
        <S.HeaderContentWrapper>
          <Text size={18} fontFamily="bold">
            {title}
          </Text>
        </S.HeaderContentWrapper>
      </S.HeaderContainer>
      <WebView
        source={{ uri: 'https://pf.kakao.com/_xkMcxdG' }}
        onLoad={() => setIsLoading(false)}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        onMessage={(message) => setTitle(message.nativeEvent.data)}
      >
        {isLoading ? (
          <S.LoadingWrapper>
            <ActivityIndicator size="large" color={colors.lightGray} />
          </S.LoadingWrapper>
        ) : null}
      </WebView>
    </S.WebViewSafeContainer>
  );
};
