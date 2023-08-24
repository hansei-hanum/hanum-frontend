import React, { useCallback, useEffect, useState } from 'react';

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
} from './screens';
import {
  SpoqaHanSansNeoBold,
  SpoqaHanSansNeoMedium,
  SpoqaHanSansNeoRegular,
  SpoqaHanSansNeoLight,
  SpoqaHanSansNeoThin,
} from './assets';
import { MainScreen } from './screens/main';

const stack = createStackNavigator();

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
      <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        <stack.Screen name="Main" component={MainScreen} />
        <stack.Screen name="AuthMain" component={AuthMainScreen} />
        <stack.Screen name="Phone" component={PhoneScreen} />
        <stack.Screen name="Name" component={NameScreen} />
        <stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <stack.Screen name="SelfCheck" component={SelfCheckScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
