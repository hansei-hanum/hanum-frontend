import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, useColorScheme, Appearance } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeProvider } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as SC from './screens';
import { useCodePush, useFetchUser } from './hooks';
import { darkTheme, lightTheme } from './styles';
import { authAtom, themeAtom } from './atoms';
import { isAndroid } from './utils';
import { useToastConfig } from './constants';
import { CheckVersion } from './components';
import { RootStackParamList } from './types/stackParams';

const Stack = createStackNavigator<RootStackParamList>();

export const ERROR_MESSAGE = 'UNAUTHORIZED';

export const Router: React.FC = () => {
  const inset = useSafeAreaInsets();

  const { toastConfig } = useToastConfig();

  const setAppTheme = useSetRecoilState(themeAtom);
  const auth = useRecoilValue(authAtom);

  const { data, isLoading } = useFetchUser();

  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme);
    colorScheme && setAppTheme(colorScheme);
  });

  const isDarkTheme = theme === 'dark';

  const systemTheme = useColorScheme();

  const getTheme = () => {
    systemTheme && setAppTheme(systemTheme);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    return token;
  };

  useEffect(() => {
    async function prepare() {
      getTheme();
      await getToken();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        if (!isLoading) {
          setIsReady(true);
        }
      }
    }

    prepare();
  }, [isLoading]);

  const onLayoutRootView = useCallback(async () => {}, [isReady]);

  const [isUpdating] = useCodePush();

  if (isReady && !isUpdating) {
    SplashScreen.hide();
  } else {
    return null;
  }

  const getInitialRoute = () => {
    if (!isLoading) {
      if (!token) return 'AuthMain';
      if (data && data?.data) return 'Main';
      if (auth.errorMessage === ERROR_MESSAGE) return 'AuthMain';
      return 'NoInternet';
    }
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {/* <CheckVersion /> */}
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: isDarkTheme ? '#2A2B2E' : '#FEFEFE',
            },
            ...(isAndroid &&
              isDarkTheme && {
                cardStyleInterpolator: ({ current }) => ({
                  cardStyle: {
                    opacity: current.progress,
                  },
                }),
              }),
          }}
          initialRouteName={'Main'}
        >
          <Stack.Group>
            <Stack.Screen name="AuthMain" component={SC.AuthMainScreen} />
            <Stack.Screen name="Login" component={SC.FormScreen} />
            <Stack.Screen name="Register" component={SC.FormScreen} />
            <Stack.Screen name="VerifyCode" component={SC.VerifyCodeScreen} />
            <Stack.Screen name="Verify" component={SC.VerifyScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="NoInternet" component={SC.NoInternetScreen} />
            <Stack.Screen name="Main" component={SC.MainScreen} />
            <Stack.Screen name="Schedule" component={SC.ScheduleScreen} />
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
            <Stack.Screen name="CommunityPostDetail" component={SC.CommunityPostDetailScreen} />
            <Stack.Screen name="CommunityCreatePost" component={SC.CommunityCreatePostScreen} />
            <Stack.Screen name="CommunityVisibleType" component={SC.VisibleTypeScreen} />
            <Stack.Screen
              name="CommunityAnonymitySettings"
              component={SC.AnonymitySettingsScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="HanowlMain" component={SC.HanowlApplyMainScreen} />
            <Stack.Screen name="HanowlSelectTeam" component={SC.SelectTeamScreen} />
            <Stack.Screen name="HanowlApplyDetails" component={SC.ApplyContentsScreen} />
            <Stack.Screen name="HanowlFinalConfirm" component={SC.FinalConfirmScreen} />
            <Stack.Screen name="HanowlConfirm" component={SC.ConfirmScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="UserInfo" component={SC.UserInfoScreen} />
            <Stack.Screen name="UserPost" component={SC.UserPostScreen} />
            <Stack.Screen name="UserBlocList" component={SC.UserBlockListScreen} />
          </Stack.Group>
        </Stack.Navigator>
        <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      </NavigationContainer>
      <Toast position="top" bottomOffset={inset.bottom - 10} config={toastConfig} />
    </ThemeProvider>
  );
};
