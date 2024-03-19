import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebViewMessageEvent } from 'react-native-webview';
import { ScrollView } from 'react-native';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import {
  BottomSheet,
  GoBackIcon,
  MainWebView,
  TEAM_ID_TO_TEXT,
  TeamId,
  HanowlApplySkeleton,
  TeamsWebView,
} from 'src/components';
import { SCREEN_HEIGHT } from 'src/constants';
import { isAndroid } from 'src/utils';
import { TeamType, hanowlApplyAtom } from 'src/atoms';
import { useBottomSheet, useNavigate } from 'src/hooks';
import { useGetTemporaryApplication } from 'src/hooks/query/hanowlApply';

export const HanowlApplyMainScreen: React.FC = () => {
  const { data, isLoading } = useGetTemporaryApplication();

  const navigate = useNavigate();

  const theme = useTheme();
  const { bottomSheetRef, openBottomSheet } = useBottomSheet();
  const setHanowlApply = useSetRecoilState(hanowlApplyAtom);

  const [message, setMessage] = useState<string | null>(null);
  const [teamLoading, setTeamLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    setMessage(data);
    setTeamLoading(true);
    if (data !== 'null' && data !== null && data !== '') {
      openBottomSheet({ scrollTo: -SCREEN_HEIGHT + 100 });
      setTimeout(() => {
        setTeamLoading(false);
      }, 600);
    }
  };

  const onPress = () => {
    bottomSheetRef.current?.scrollTo(0);
    setHanowlApply((prev) => ({ ...prev, team: TEAM_ID_TO_TEXT[message as TeamId] as TeamType }));
    navigate('HanowlApplyDetails');
  };

  return (
    <>
      <GoBackIcon
        isWhite
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 10,
          zIndex: 999,
          marginTop: isAndroid ? 10 : 0,
        }}
      />
      <MainWebView onMessage={onMessage} isLoading={isLoading} applyData={data} />
      <BottomSheet
        ref={bottomSheetRef}
        scrollHeight={-SCREEN_HEIGHT + 100}
        style={{ backgroundColor: '#2A2B2E' }}
      >
        {teamLoading && <HanowlApplySkeleton.Teams theme={theme} />}
        {isAndroid ? (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              paddingBottom: 50,
              justifyContent: 'space-around',
            }}
          >
            <TeamsWebView
              message={message}
              teamLoading={teamLoading}
              theme={theme}
              onPress={onPress}
              isLoading={isLoading}
            />
          </ScrollView>
        ) : (
          <TeamsWebView
            message={message}
            teamLoading={teamLoading}
            theme={theme}
            onPress={onPress}
            isLoading={isLoading}
          />
        )}
      </BottomSheet>
    </>
  );
};
