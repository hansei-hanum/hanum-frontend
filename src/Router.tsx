/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import * as SC from './screens';
import { useFetchUser } from './hooks';
import { isIos } from './utils';
import { useCodePush } from './hooks';
import { loadingAtom } from './atoms/loading';

const Stack = createStackNavigator();

export type RootStackParamList = {
  WebView: { url: string };
};

export const Router: React.FC = () => {
  const loading = useRecoilValue(loadingAtom);
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
        screenOptions={{ headerShown: false, gestureEnabled: loading }}
        initialRouteName={data ? 'Main' : 'AuthMain'}
      >
        <Stack.Group>
          <Stack.Screen name="AuthMain" component={SC.AuthMainScreen} />
          <Stack.Screen name="Phone" component={SC.PhoneScreen} />
          <Stack.Screen name="Name" component={SC.NameScreen} />
          <Stack.Screen name="VerifyCode" component={SC.VerifyCodeScreen} />
          <Stack.Screen name="Verify" component={SC.VerifyScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Main" component={SC.MainScreen} />
          <Stack.Screen name="Calendar" component={SC.CalendarScreen} />
          <Stack.Screen name="UserInfo" component={SC.UserInfoScreen} />
          <Stack.Screen name="WebView" component={SC.WebViewScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="HanumPayMain" component={SC.HanumPayMainScreen} />
          <Stack.Screen name="HanumPayQR" component={SC.HanumPayQRScreen} />
          <Stack.Screen name="HanumPayStatus" component={SC.HanumPayStatusScreen} />
          <Stack.Screen name="HanumPay" component={SC.HanumPayScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="EoullimMain" component={SC.EoullimMainScreen} />
          <Stack.Screen name="EoullimVote" component={SC.EoullimVoteScreen} />
          <Stack.Screen name="EoullimTimeTable" component={SC.EoullimTimeTableScreen} />
          <Stack.Screen name="EoullimRaffle" component={SC.EoullimRaffleScreen} />
          <Stack.Screen name="EoullimStatus" component={SC.EoullimStatusScreen} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar barStyle={isIos ? 'dark-content' : 'light-content'} />
    </NavigationContainer>
  );
};
