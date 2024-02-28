import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebViewMessageEvent } from 'react-native-webview';

import { useTheme } from '@emotion/react';

import {
  BottomSheet,
  Button,
  GoBackIcon,
  MainWebView,
  TEAM_ID_TO_TEXT,
  TeamId,
  TeamsWebView,
  Text,
} from 'src/components';
import { SCREEN_HEIGHT } from 'src/constants';
import { BottomSheetRefProps } from 'src/types';
import { isAndroid } from 'src/utils';

import * as S from './styled';

export const HanowlApplyMainScreen: React.FC = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT + 100);
  };
  const [message, setMessage] = useState<string | null>(null);
  const [teamLoading, setTeamLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    setMessage(data);
    setTeamLoading(true);
    if (data !== 'null' && data !== null && data !== '') {
      openBottomSheet();
      setTimeout(() => {
        setTeamLoading(false);
      }, 200);
    }
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
      <MainWebView onMessage={onMessage} />
      <BottomSheet
        ref={bottomSheetRef}
        scrollHeight={-SCREEN_HEIGHT + 100}
        style={{ backgroundColor: '#2A2B2E' }}
      >
        <TeamsWebView message={message} teamLoading={teamLoading} />
        <S.TeamApplyButtonWrapper style={teamLoading ? { display: 'none' } : {}}>
          <Button
            onPress={() => console.log('test')}
            style={{ paddingVertical: 14, backgroundColor: theme.primary }}
          >
            <Text size={16} isCenter color={theme.white}>
              {TEAM_ID_TO_TEXT[message as TeamId]} 지원하기
            </Text>
          </Button>
        </S.TeamApplyButtonWrapper>
      </BottomSheet>
    </>
  );
};
