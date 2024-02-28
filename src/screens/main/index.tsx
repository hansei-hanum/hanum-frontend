import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import WebView from 'react-native-webview';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@emotion/react';

import { HomeScreen, ShowMoreScreen, TimeTableScreen, MealTableScreen } from 'src/screens';
import { isIos } from 'src/utils';
import { TabBarStyle } from 'src/styles';

import { CommunityMainScreen } from '../community';

const BottomTab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const theme = useTheme();
  const inset = useSafeAreaInsets();

  const style = TabBarStyle(theme, inset);

  const getScreenOptions = (title: string, iconName: string) => ({
    title,
    tabBarIcon: ({ color }: { color: string }) => <Icons name={iconName} size={25} color={color} />,
  });

  const triggerTabPress = () => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.default,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: { ...style, position: 'absolute' },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
      initialRouteName="홈"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={getScreenOptions('홈', 'home')}
        listeners={{
          tabPress: triggerTabPress,
        }}
      />
      <BottomTab.Screen
        name="TimeTable"
        component={TimeTableScreen}
        options={getScreenOptions('시간표', 'access-time')}
        listeners={{
          tabPress: triggerTabPress,
        }}
      />
      <BottomTab.Screen
        name="Meal"
        component={MealTableScreen}
        options={getScreenOptions('급식', 'restaurant')}
        listeners={{
          tabPress: triggerTabPress,
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityMainScreen}
        options={getScreenOptions('대나무숲', 'article')}
        listeners={{
          tabPress: triggerTabPress,
        }}
      />
      <BottomTab.Screen
        name="More"
        component={ShowMoreScreen}
        options={getScreenOptions('더보기', 'menu')}
        listeners={{
          tabPress: triggerTabPress,
        }}
      />
    </BottomTab.Navigator>
  );
};
