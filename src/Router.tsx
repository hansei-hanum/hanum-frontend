import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AuthMainScreen,
  NameScreen,
  PhoneScreen,
  SelfCheckScreen,
  VerifyCodeScreen,
  MainScreen,
  HanumPayScreen,
} from './screens';
import { useFetchUser } from './hooks';

const Stack = createStackNavigator();

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

  const onLayoutRootView = useCallback(async () => {

  }, [isReady, isLoading]);

  if (!isReady || isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'AuthMain'}>
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
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
    </NavigationContainer>
  );
};
