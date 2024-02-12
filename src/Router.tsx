import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeProvider } from '@emotion/react';
import { useRecoilState } from 'recoil';

import * as SC from './screens';
import { useCodePush, useFetchUser } from './hooks';
import { fetchUser } from './api';
import { darkTheme, lightTheme } from './styles';
import { themeAtom } from './atoms';
import { isAndroid } from './utils';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  AuthMain: undefined;
  Phone: undefined;
  Name: undefined;
  VerifyCode: undefined;
  Verify: undefined;
  Main: undefined;
  Schedule: undefined;
  UserInfo: undefined;
  WebView: undefined;
  HanumPayMain: undefined;
  HanumPayQR: undefined;
  HanumPayStatus: undefined;
  HanumPay: undefined;
  EoullimMain: undefined;
  EoullimVote: undefined;
  EoullimTimeTable: undefined;
  EoullimRaffle: undefined;
  EoullimStatus: undefined;
  CommunityMain: undefined;
  CommunityChat: { id: number };
  CommunityPost: undefined;
  CommunityVisibleType: undefined;
  CommunityAnonymitySettings: undefined;
};

export const Router: React.FC = () => {
  useFetchUser();
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState<null | string>(null);

  const [themeValue, setThemeValue] = useRecoilState(themeAtom);

  const theme = useColorScheme();

  const isDark = themeValue === 'dark';

  const fetch = useCallback(async () => {
    try {
      const { data } = await fetchUser();
      setData(data);
    } catch (e) {
      // await AsyncStorage.removeItem('token');
      console.log(e, 'error');
    }
  }, []);

  const getTheme = useCallback(async () => {
    const StorageTheme = await AsyncStorage.getItem('theme');
    if (theme && (!StorageTheme || theme === StorageTheme)) {
      setThemeValue(theme);
    } else {
      setThemeValue(StorageTheme);
    }
  }, []);

  useEffect(() => {
    async function prepare() {
      await fetch();
      await getTheme();
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

  const onLayoutRootView = useCallback(async () => {}, [isReady]);

  const [isUpdating] = useCodePush();

  if (isReady && !isUpdating) {
    SplashScreen.hide();
  } else if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: isDark ? '#2A2B2E' : '#FEFEFE',
            },
            ...(isAndroid &&
              isDark && {
                cardStyleInterpolator: ({ current }) => ({
                  cardStyle: {
                    opacity: current.progress,
                  },
                }),
              }),
          }}
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
            <Stack.Screen name="Schedule" component={SC.ScheduleScreen} />
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
          <Stack.Group>
            <Stack.Screen name="CommunityChat" component={SC.CommunityChatScreen} />
            <Stack.Screen name="CommunityPost" component={SC.CommunityCreatePostScreen} />
            <Stack.Screen name="CommunityVisibleType" component={SC.VisibleTypeScreen} />
            <Stack.Screen
              name="CommunityAnonymitySettings"
              component={SC.AnonymitySettingsScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      </NavigationContainer>
    </ThemeProvider>
  );
};
