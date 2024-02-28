import React, { useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { useTheme } from '@emotion/react';

import { Button } from 'src/components/common';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface MainWebViewProps {
  onMessage: (event: WebViewMessageEvent) => void;
}

export const MainWebView: React.FC<MainWebViewProps> = ({ onMessage }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [mainLoading, setMainLoading] = useState(true);

  return (
    <>
      <S.HanowlApplyMainDummyContainer style={!mainLoading && { display: 'none' }} />
      <WebView
        source={{ uri: 'http://172.30.1.18:3000/' }}
        style={{
          flex: 1,
          backgroundColor: theme.black,
        }}
        onMessage={onMessage}
        injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
        onLoadEnd={() => setTimeout(() => setMainLoading(false), 200)}
      />
      <S.HanowlApplyButtonWrapper>
        <Button onPress={() => navigate('HanowlSelectTeam')} activeOpacity={1}>
          학생회 지원하기
        </Button>
      </S.HanowlApplyButtonWrapper>
    </>
  );
};
