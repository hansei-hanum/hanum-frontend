import React from 'react';
import { Platform } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@emotion/react';

import { HomeScreen, ShowMoreScreen, ScheduleScreen } from 'src/screens';
import { iosCheckHeight } from 'src/utils';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const theme = useTheme();
  const size = 25;
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBarBg,
          height: iosCheckHeight ? 80 : 64,
          paddingBottom: iosCheckHeight ? 30 : 10,
        },
        tabBarActiveTintColor: theme.default,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          paddingBottom: 0,
          marginBottom: Platform.OS == 'ios' ? -8 : -10,
          color: theme.default,
        },
      }}
      initialRouteName="홈"
    >
      <BottomTab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="시간표"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => <Icons name="access-time" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="더보기"
        component={ShowMoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Icons name="menu" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
