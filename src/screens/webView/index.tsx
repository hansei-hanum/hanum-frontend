import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

import { Header, Spinner, Text } from 'src/components';

import * as S from './styled';

export const WebViewScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('읽어들이는 중..');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <S.WebViewSafeContainer>
      <Header hasGoBackIcon>
        <S.HeaderContentWrapper>
          <Text size={18} fontFamily="bold">
            {title}
          </Text>
        </S.HeaderContentWrapper>
      </Header>
      <WebView
        source={{ uri: 'https://pf.kakao.com/_xkMcxdG' }}
        onLoad={() => setIsLoading(false)}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        onMessage={(message) => setTitle(message.nativeEvent.data)}
      >
        {isLoading ? (
          <S.LoadingWrapper>
            <Spinner size={32} />
          </S.LoadingWrapper>
        ) : null}
      </WebView>
    </S.WebViewSafeContainer>
  );
};
