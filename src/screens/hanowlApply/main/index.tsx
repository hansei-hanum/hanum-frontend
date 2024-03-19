import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebViewMessageEvent } from 'react-native-webview';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

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
import { hanowlApplyAtom } from 'src/atoms';
import { useBottomSheet, useCheckUserType, useGetUser, useNavigate } from 'src/hooks';
import { useGetHanowlTeams, useGetTemporaryApplication } from 'src/hooks/query/hanowlApply';

export const HanowlApplyMainScreen: React.FC = () => {
  const { isStudent } = useCheckUserType();

  const { data: teamsData, isLoading: isTeamsLoading } = useGetHanowlTeams();

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
    if (teamsData) {
      setHanowlApply((prev) => {
        const teamDataItem = teamsData?.data.items.find(
          (item) => item.name === TEAM_ID_TO_TEXT[message as TeamId],
        );
        if (!teamDataItem) {
          return prev;
        }
        return {
          ...prev,
          team: {
            name: teamDataItem.name,
            id: teamDataItem.id,
          },
        };
      });
    }
    if (isStudent) {
      navigate('HanowlApplyDetails');
    } else {
      Toast.show({
        type: 'error',
        text1: '학생회 지원은 재학생만 가능해요',
      });
    }
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
      <MainWebView
        onMessage={onMessage}
        isLoading={isLoading || isTeamsLoading}
        applyData={data?.data}
      />
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
            isLoading={isLoading || isTeamsLoading}
          />
        )}
      </BottomSheet>
    </>
  );
};
