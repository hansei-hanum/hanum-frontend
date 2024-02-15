import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@emotion/react';

import { HomeScreen, ShowMoreScreen, TimeTableScreen, MealTableScreen } from 'src/screens';
import { isIos } from 'src/utils';
import { TabBarStyle } from 'src/styles';

import { CommunityMainScreen } from '../community';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const inset = useSafeAreaInsets();
  const theme = useTheme();
  const style = TabBarStyle(theme, inset);

  const size = 25;
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.default,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: inset && theme ? style : {},
        tabBarIconStyle: {
          paddingBottom: 0,
          marginBottom: isIos ? -8 : -10,
          color: theme.default,
        },
      }}
      initialRouteName="홈"
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
        component={TimeTableScreen}
        options={{
          title: '시간표',
          tabBarIcon: ({ color }) => <Icons name="access-time" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Meal"
        component={MealTableScreen}
        options={{
          title: '급식표',
          tabBarIcon: ({ color }) => <Icons name="restaurant" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityMainScreen}
        options={{
          title: '대나무숲',
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
