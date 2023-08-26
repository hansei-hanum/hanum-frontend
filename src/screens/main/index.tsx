import React from 'react';
import { Platform } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CafeteriaScreen, HomeScreen, MoreScreen, ScheduleScreen } from 'src/screens';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const size = 25;
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: Platform.OS == 'ios' ? 80 : 60,
          paddingBottom: Platform.OS == 'ios' ? 30 : 10,
        },
        tabBarActiveTintColor: '#000',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          paddingBottom: 0,
          marginBottom: Platform.OS == 'ios' ? -8 : -10,
          color: '#000',
        },
      }}
      initialRouteName="Main"
    >
      <BottomTab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="급식표"
        component={CafeteriaScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-restaurant" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="시간표"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="access-time" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="더보기"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="menu" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
