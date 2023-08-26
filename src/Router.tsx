import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  AuthMainScreen,
  NameScreen,
  PhoneScreen,
  SelfCheckScreen,
  VerifyCodeScreen,
  MainScreen,
  HanumPayScreen,
} from './screens';
import {
  SpoqaHanSansNeoBold,
  SpoqaHanSansNeoMedium,
  SpoqaHanSansNeoRegular,
  SpoqaHanSansNeoLight,
  SpoqaHanSansNeoThin,
} from './assets';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export const Router: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          SpoqaHanSansNeoBold: SpoqaHanSansNeoBold,
          SpoqaHanSansNeoMedium: SpoqaHanSansNeoMedium,
          SpoqaHanSansNeoRegular: SpoqaHanSansNeoRegular,
          SpoqaHanSansNeoLight: SpoqaHanSansNeoLight,
          SpoqaHanSansNeoThin: SpoqaHanSansNeoThin,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthMain">
        <Stack.Group screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="AuthMain" component={AuthMainScreen} />
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
          <Stack.Screen name="SelfCheck" component={SelfCheckScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="HanumPay" component={HanumPayScreen} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};
