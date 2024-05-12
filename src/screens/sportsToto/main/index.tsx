import React, { useCallback } from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MRI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { StatusBar } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ScreenHeader } from 'src/components';
import { isAndroid, isIos } from 'src/utils';
import { sportsTotoTitleAtom } from 'src/atoms';

import { TotoMatchListScreen, TotoPointLogScreen, TotoLiveChattingScreen } from '..';
import { TotoRankingScreen } from '../ranking';
import { TotoPredictLogsScreen } from '../predictLogs';
const BottomTab = createBottomTabNavigator();

export const TotoMainScreen: React.FC = () => {
  const theme = useTheme();
  const inset = useSafeAreaInsets();

  const sportsTotoTitle = useRecoilValue(sportsTotoTitleAtom);
  const setSportsTotoTileAtom = useSetRecoilState(sportsTotoTitleAtom);

  const triggerTabPress = useCallback(
    (title: string) => {
      setSportsTotoTileAtom(title);
      trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    },
    [sportsTotoTitle],
  );

  return (
    <>
      <ScreenHeader
        style={{
          paddingTop: inset.top,
          backgroundColor: '#FEFEFE',
        }}
        isItemBlack={true}
        title={sportsTotoTitle}
      />
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.black,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: { backgroundColor: '#FEFEFE', borderTopWidth: 0 },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
        initialRouteName="TotoLiveChatting"
      >
        <BottomTab.Screen
          name="TotoLiveChatting"
          component={TotoLiveChattingScreen}
          options={{
            tabBarLabel: '실시간 경기',
            tabBarIcon: ({ color }) => <Icons name="play-circle-outline" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('실시간 경기'),
          }}
        />
        <BottomTab.Screen
          name="TotoMatchList"
          component={TotoMatchListScreen}
          options={{
            tabBarLabel: '경기 목록',
            tabBarIcon: ({ color }) => <Icons name="sports-basketball" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('경기 목록'),
          }}
        />
        <BottomTab.Screen
          name="TotoPoint"
          component={TotoPointLogScreen}
          options={{
            tabBarLabel: '포인트',
            tabBarIcon: ({ color }) => <MRI name="wallet-outline" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('포인트'),
          }}
        />
        <BottomTab.Screen
          name="TotoRanking"
          component={TotoRankingScreen}
          options={{
            tabBarLabel: '포인트 순위',
            tabBarIcon: ({ color }) => <MRI name="medal-outline" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('포인트 순위'),
          }}
        />
        <BottomTab.Screen
          name="TotoPredictLogs"
          component={TotoPredictLogsScreen}
          options={{
            tabBarLabel: '예측 내역',
            tabBarIcon: ({ color }) => <Icons name="access-time" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('예측 내역'),
          }}
        />
      </BottomTab.Navigator>
      <StatusBar barStyle={'dark-content'} backgroundColor={isAndroid ? '#2A2B2E' : 'auto'} />
    </>
  );
};
