import React, { useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { useTheme } from '@emotion/react';

import { Button } from 'src/components/common';
import { useCheckApplyPeriod, useNavigate } from 'src/hooks';
import { HANOWL_APPLY } from 'src/constants';
import { GetTemporaryApplicationResponse } from 'src/api/hanowlApply';

import * as S from './styled';

export interface MainWebViewProps {
  onMessage: (event: WebViewMessageEvent) => void;
  isLoading: boolean;
  applyData?: GetTemporaryApplicationResponse[];
}

export const MainWebView: React.FC<MainWebViewProps> = ({ onMessage, isLoading, applyData }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [mainLoading, setMainLoading] = useState(true);
  const { isApplyPeriod, timeLeftString } = useCheckApplyPeriod();

  const onButtonPress = () => {
    if (applyData && applyData?.length > 0) {
      navigate('HanowlConfirm');
    } else {
      navigate('HanowlSelectTeam');
    }
  };

  const checkDisplay = !mainLoading && !isLoading && isApplyPeriod;

  return (
    <>
      <S.HanowlApplyMainDummyContainer style={!mainLoading && { display: 'none' }} />
      <WebView
        source={{ uri: `${HANOWL_APPLY.URL}` }}
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
          onPress={onButtonPress}
          activeOpacity={1}
          // isDisabled={checkDisplay}
          style={{
            opacity: 1,
            backgroundColor: checkDisplay ? theme.primary : theme.placeholder,
          }}
          isLoading={isLoading}
        >
          {!isLoading && (isApplyPeriod ? '학생회 지원하기' : `${timeLeftString}`)}
        </Button>
      </S.HanowlApplyButtonWrapper>
    </>
  );
};
