import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@emotion/react';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { MatchListScreen, PredictScreen, PointLogScreen, LiveChattingScreen } from '..';
import { Header, Text } from 'src/components';
import { isIos } from 'src/utils';
import { TabBarStyle } from 'src/styles';
const BottomTab = createBottomTabNavigator();

export const SportsTotoMainScreen: React.FC = () => {
  const theme = useTheme();
  const inset = useSafeAreaInsets();

  const style = TabBarStyle(theme, inset);
  const [pageTitle, setPageTitle] = React.useState('실시간 경기');

  const triggerTabPress = (title: string) => {
    setPageTitle(title);
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header isTotoText={true} style={{ flexDirection: 'row' }} hasGoBackIcon={true}>
        <Text style={{ flex: 1 }} isCenter={true} size={18}>
          {pageTitle}
        </Text>
        <View style={{ flex: 1 }}></View>
      </Header>
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
        initialRouteName="Live"
      >
        <BottomTab.Screen
          name="Live"
          component={LiveChattingScreen}
          options={{
            tabBarLabel: '실시간 경기',
            tabBarIcon: ({ color }) => <Icons name="live" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('실시간 경기'),
          }}
        />
        <BottomTab.Screen
          name="Match"
          component={MatchListScreen}
          options={{
            tabBarLabel: '경기 목록',
            tabBarIcon: ({ color }) => <Icons name="match-list" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('경기 목록'),
          }}
        />
        <BottomTab.Screen
          name="Point"
          component={PointLogScreen}
          options={{
            tabBarLabel: '포인트 내약',
            tabBarIcon: ({ color }) => <Icons name="point" size={25} color={color} />,
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
            tabBarIcon: ({ color }) => <Icons name="predict-log" size={25} color={color} />,
          }}
          listeners={{
            tabPress: () => triggerTabPress('예측 내역'),
          }}
        />
      </BottomTab.Navigator>
    </SafeAreaView>
  );
};
