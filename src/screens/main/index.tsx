import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@emotion/react';

import { HomeScreen, ShowMoreScreen, ScheduleScreen, LunchTableScreen } from 'src/screens';
import { iosCheckHeight, isIos } from 'src/utils';

import { CommunityMainScreen } from '../community';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const theme = useTheme();

  const size = 25;
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          zIndex: 10,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          borderTopColor: theme.secondary,
          borderTopWidth: 1,
          borderLeftColor: theme.secondary,
          borderLeftWidth: 1,
          borderRightColor: theme.secondary,
          borderRightWidth: 1,
          backgroundColor: theme.tabBarBg,
          height: iosCheckHeight ? 78 : 64,
          paddingBottom: iosCheckHeight ? 26 : 10,
          position: 'absolute',
        },
        tabBarActiveTintColor: theme.default,
        tabBarLabelStyle: {
          fontSize: 12,
        },

        tabBarIconStyle: {
          paddingBottom: 0,
          marginBottom: isIos ? -8 : -10,
          color: theme.default,
        },
      }}
      initialRouteName="대나무숲"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TimeTable"
        component={ScheduleScreen}
        options={{
          title: '시간표',
          tabBarIcon: ({ color }) => <Icons name="access-time" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Meal"
        component={LunchTableScreen}
        options={{
          title: '급식표',
          tabBarIcon: ({ color }) => <Icons name="restaurant" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="대나무숲"
        component={CommunityMainScreen}
        options={{
          tabBarIcon: ({ color }) => <Icons name="article" size={size + 4} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="More"
        component={ShowMoreScreen}
        options={{
          title: '더보기',
          tabBarIcon: ({ color }) => <Icons name="menu" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
