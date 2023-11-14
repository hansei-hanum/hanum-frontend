import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';
import { Linking, PermissionsAndroid, TouchableOpacity, Image } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { Timer, Calendar } from 'src/components';
import { iosCheckHeight, isAndroid, isIos } from 'src/utils';
import { useConnectNotification } from 'src/hooks';
import { themeAtom } from 'src/atoms';

import { Logo, WhiteLogo } from '../../../assets/images';

import * as S from './styled';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();

  const themeValue = useRecoilValue(themeAtom);

  const { mutate } = useConnectNotification();

  const navigator = useNavigation();

  const requestUserPermission = async () => {
    let isGranted = false;

    if (isIos) {
      const authStatus = await messaging().requestPermission();
      isGranted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else if (isAndroid) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      const authStatus = await messaging().hasPermission();
      isGranted = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    }

    if (isGranted) {
      const token = await messaging().getToken();
      console.log("Token:", token);
      mutate({ token: token, platform: isIos ? 'IOS' : 'ANDROID' });
    }
  };

  const messageListener = async () => {
    await messaging().onMessage(async (remoteMessage) => {
      await Notifier.showNotification({
        title: remoteMessage.notification?.title || '알림',
        description: remoteMessage.notification?.body,
        duration: 3000,
        showAnimationDuration: 500,
        hideOnPress: false,
      });
    });
  };

  useEffect(() => {
    requestUserPermission();
    messageListener();
    messaging().subscribeToTopic('announcement');
  }, []);

    interface ParsedURL {
    path: string[];
    params: Record<string, string> | null;
  }
  
  function parseDeeplink(url: string): ParsedURL | null {
    const protocol = "hanum://";
    if (!url.startsWith(protocol)) {
      return null;
    }
  
    const pathAndParams = url.slice(protocol.length).split("?");
    const path = pathAndParams[0].split("/").filter(Boolean);
    const params = pathAndParams[1]
      ? parseQueryString(pathAndParams[1])
      : null;
  
    return { path, params };
  }
  
  function parseQueryString(queryString: string): Record<string, string> {
    const params: Record<string, string> = {};
    const keyValuePairs = queryString.split("&");
  
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      params[key] = value;
    });
  
    return params;
  }

  function handleOpenURL(url: string) {
    const linkInfo = parseDeeplink(url);
    if (linkInfo){
      navigator.navigate({name: linkInfo.path[linkInfo.path.length - 1], params: linkInfo.params} as never);
    }
  }

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data) {
        handleOpenURL(remoteMessage.data.url);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data) {
          handleOpenURL(remoteMessage.data.url);
        }
      });
  }, []);

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenHeader>
        <Image
          source={themeValue === 'light' ? Logo : WhiteLogo}
          style={{ width: 98, height: 40, resizeMode: 'contain' }}
        />
        <S.HomeScreenHeaderIconContainer>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Linking.openURL('kakaoplus://plusfriend/talk/chat/405758775').catch(() =>
                Linking.openURL('https://pf.kakao.com/_xkMcxdG'),
              );
            }}
          >
            <AntDesign name="customerservice" size={28} color={theme.placeholder} />
          </TouchableOpacity>
        </S.HomeScreenHeaderIconContainer>
      </S.HomeScreenHeader>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: iosCheckHeight ? 70 : 78,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        {/* <AlertBox
          navigateUrl="EoullimMain"
          icon="🎉"
          subText="한세어울림한마당 진행 중!"
          mainText="실시간으로 즐기기"
        /> */}
        <Timer />
        <Calendar />
        <Timer />
        <Calendar />
        <Timer />
        <Calendar />
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
