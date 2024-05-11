import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MRI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@emotion/react';

import { Header, ScreenHeader, Text } from 'src/components';
import { isIos } from 'src/utils';
import { TabBarStyle } from 'src/styles';

import { MatchListScreen, PredictScreen, PointLogScreen, LiveChattingScreen } from '..';
const BottomTab = createBottomTabNavigator();

export const SportsTotoMainScreen: React.FC = () => {
  const theme = useTheme();
  const inset = useSafeAreaInsets();

  const style = TabBarStyle(theme, inset);
  const [pageTitle, setPageTitle] = useState('실시간 경기');

  const triggerTabPress = (title: string) => {
    setPageTitle(title);
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
  };

  return (
    <>
      <ScreenHeader
        style={{
          paddingTop: inset.top,
          backgroundColor: '#FEFEFE',
        }}
        isItemBlack={theme.black}
        title={pageTitle}
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
        initialRouteName="LiveChatting"
      >
        <BottomTab.Screen
          name="LiveChatting"
          component={LiveChattingScreen}
          options={{
            tabBarLabel: '실시간 경기',
            tabBarIcon: ({ color }) => <Icons name="play-circle-outline" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('실시간 경기'),
          }}
        />
        <BottomTab.Screen
          name="MatchList"
          component={MatchListScreen}
          options={{
            tabBarLabel: '경기 목록',
            tabBarIcon: ({ color }) => <Icons name="sports-basketball" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('경기 목록'),
          }}
        />
        <BottomTab.Screen
          name="Point"
          component={PointLogScreen}
          options={{
            tabBarLabel: '포인트 내역',
            tabBarIcon: ({ color }) => <MRI name="wallet-outline" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('포인트 내역'),
          }}
        />
        <BottomTab.Screen
          name="Predict"
          component={PredictScreen}
          options={{
            tabBarLabel: '예측 내역',
            tabBarIcon: ({ color }) => <Icons name="access-time" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('예측 내역'),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
