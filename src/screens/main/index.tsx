import React from 'react';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CafeteriaScreen, HomeScreen, MoreScreen, PayScreen, ScheduleScreen } from 'src/screens';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { paddingBottom: 30, paddingTop: 10 } }}
      initialRouteName="Main"
    >
      <BottomTab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
          tabBarActiveTintColor: '#000',
        }}
      />
      <BottomTab.Screen
        name="한움페이"
        component={PayScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="payment" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#000',
        }}
      />
      <BottomTab.Screen
        name="급식표"
        component={CafeteriaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-restaurant" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#000',
        }}
      />
      <BottomTab.Screen
        name="시간표"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-time" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#000',
        }}
      />
      <BottomTab.Screen
        name="더보기"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="menu" size={size} color={color} />,
          tabBarActiveTintColor: '#000',
        }}
      />
    </BottomTab.Navigator>
  );
};
