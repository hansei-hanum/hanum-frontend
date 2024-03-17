import React, { useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { useTheme } from '@emotion/react';

import { Button } from 'src/components/common';
import { useCheckApplyPeriod, useNavigate } from 'src/hooks';
import { HANOWL_APPLY } from 'src/constants';

import * as S from './styled';

export interface MainWebViewProps {
  onMessage: (event: WebViewMessageEvent) => void;
}

export const MainWebView: React.FC<MainWebViewProps> = ({ onMessage }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [mainLoading, setMainLoading] = useState(true);
  const { isApplyPeriod, timeLeftString } = useCheckApplyPeriod();

  return (
    <>
      <S.HanowlApplyMainDummyContainer style={!mainLoading && { display: 'none' }} />
      <WebView
        source={{ uri: `${HANOWL_APPLY.URL}?isApp=true` }}
        style={{
          flex: 1,
          backgroundColor: theme.black,
        }}
        onMessage={onMessage}
        injectedJavaScriptBeforeContentLoaded={`window.isNativeApp = true;`}
        onLoadEnd={() => setTimeout(() => setMainLoading(false), 200)}
      />
      <S.HanowlApplyButtonWrapper
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)']}
      >
        <Button
          onPress={() => navigate('HanowlSelectTeam')}
          activeOpacity={1}
          isDisabled={!isApplyPeriod}
          style={{ opacity: 1, backgroundColor: isApplyPeriod ? theme.primary : theme.placeholder }}
        >
          {isApplyPeriod ? '학생회 지원하기' : `${timeLeftString}`}
        </Button>
      </S.HanowlApplyButtonWrapper>
    </>
  );
};
