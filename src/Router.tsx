/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AuthMainScreen,
  NameScreen,
  PhoneScreen,
  StudentVerifyScreen,
  VerifyCodeScreen,
  MainScreen,
  HanumPayScreen,
  CalendarScreen,
  UserInfoScreen,
  WebViewScreen,
  HanumPayQRScreen,
  HanumPayStatusScreen,
  HanumPayMainScreen,
  TeacherVerifyScreen,
  EoullimMainScreen,
  EoullimVoteScreen,
  EoullimTimeTableScreen,
  EoullimRaffleScreen,
} from './screens';
import { useFetchUser } from './hooks';
import { isIos } from './utils';
import { useCodePush } from './hooks';

const Stack = createStackNavigator();

export type RootStackParamList = {
  WebView: { url: string };
};

export const Router: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const { data, isLoading } = useFetchUser();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {}, [isReady, isLoading]);

  const [isUpdating] = useCodePush();

  if (isReady && !isLoading && !isUpdating) {
    SplashScreen.hide();
  } else if (!isReady || isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={data ? 'Main' : 'AuthMain'}
      >
        <Stack.Group>
          <Stack.Screen name="AuthMain" component={AuthMainScreen} />
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
          <Stack.Screen name="StudentVerify" component={StudentVerifyScreen} />
          <Stack.Screen name="TeacherVerify" component={TeacherVerifyScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="HanumPayMain" component={HanumPayMainScreen} />
          <Stack.Screen name="HanumPayQR" component={HanumPayQRScreen} />
          <Stack.Screen name="HanumPayStatus" component={HanumPayStatusScreen} />
          <Stack.Screen name="HanumPay" component={HanumPayScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="EoullimMain" component={EoullimMainScreen} />
          <Stack.Screen name="EoullimVote" component={EoullimVoteScreen} />
          <Stack.Screen name="EoullimTimeTable" component={EoullimTimeTableScreen} />
          <Stack.Screen name="EoullimRaffle" component={EoullimRaffleScreen} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar barStyle={isIos ? 'dark-content' : 'light-content'} />
    </NavigationContainer>
  );
};
