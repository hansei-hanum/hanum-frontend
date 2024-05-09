import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { TotoMainWebView } from 'src/components/sportsToto/MainWebView';
import { GoBackIcon } from 'src/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from 'src/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@emotion/react';
import { TabBarStyle } from 'src/styles';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { isIos } from 'src/utils';
import { MatchListScreen, PredictScreen, PointLogScreen, LiveChattingScreen } from '..';

const BottomTab = createBottomTabNavigator();

export const SportsTotoMainScreen: React.FC = () => {
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
    <>
      <GoBackIcon
        style={{
          position: 'absolute',
          top: inset.top + 10,
          left: 10,
          zIndex: 999,
          marginTop: isAndroid ? 10 : 0,
        }}
      />

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
          name="Live"
          component={LiveChattingScreen}
          options={getScreenOptions('실시간', 'live')}
          listeners={{
            tabPress: triggerTabPress,
          }}
        />
        <BottomTab.Screen
          name="Match"
          component={MatchListScreen}
          options={getScreenOptions('경기', 'match-lsit')}
          listeners={{
            tabPress: triggerTabPress,
          }}
        />
        <BottomTab.Screen
          name="Point"
          component={PointLogScreen}
          options={getScreenOptions('포인트', 'point')}
          listeners={{
            tabPress: triggerTabPress,
          }}
        />
        <BottomTab.Screen
          name="Predict"
          component={PredictScreen}
          options={getScreenOptions('예측 기록', 'predict-log')}
          listeners={{
            tabPress: triggerTabPress,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
