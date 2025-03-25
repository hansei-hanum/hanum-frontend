import React, { useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { Linking } from 'react-native';

import { useTheme } from '@emotion/react';

import { Button } from 'src/components/common';
import { useCheckApplyPeriod, useCheckUserType, useNavigate } from 'src/hooks';
import { HANOWL_APPLY } from 'src/constants';
import { GetTemporaryApplicationResponse } from 'src/api/hanowlApply';

import * as S from './styled';

export interface MainWebViewProps {
  onMessage: (event: WebViewMessageEvent) => void;
  isLoading: boolean;
  applyData?: GetTemporaryApplicationResponse;
}

export const MainWebView: React.FC<MainWebViewProps> = ({ onMessage, isLoading, applyData }) => {
  const { isStudent } = useCheckUserType();
  const theme = useTheme();

  const navigate = useNavigate();

  const [mainLoading, setMainLoading] = useState(true);
  const { isApplyPeriod, timeLeftString } = useCheckApplyPeriod();

  const onButtonPress = () => {
    if (applyData?.isSubmitted) {
      Linking.openURL(
        'https://docs.google.com/forms/d/e/1FAIpQLSe3Z0wijuu-unboh6bisdrQkAEiQo4axVYQ-4MWkxY5-vGBmA/viewform?usp=header',
      );
    } else if (isStudent) {
      Linking.openURL(
        'https://docs.google.com/forms/d/e/1FAIpQLSe3Z0wijuu-unboh6bisdrQkAEiQo4axVYQ-4MWkxY5-vGBmA/viewform?usp=header',
      );
    } else {
      Toast.show({
        type: 'error',
        text1: '학생회 지원은 재학생만 가능해요',
      });
    }
  };

  const checkDisplay = !mainLoading && !isLoading && isApplyPeriod;

  return (
    <>
      <S.HanowlApplyMainDummyContainer style={!mainLoading && { display: 'none' }} />
      <WebView
        cacheEnabled={true}
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
          // isDisabled={!checkDisplay}
          style={{
            opacity: 1,
            backgroundColor: checkDisplay ? theme.primary : theme.placeholder,
          }}
          isLoading={isLoading || mainLoading}
        >
          {!(isLoading || mainLoading) &&
            (isApplyPeriod
              ? applyData?.isSubmitted
                ? '제출한 지원서 보기'
                : '학생회 지원하기'
              : `${timeLeftString}`)}
        </Button>
      </S.HanowlApplyButtonWrapper>
    </>
  );
};
