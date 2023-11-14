import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';
import { Linking, PermissionsAndroid, TouchableOpacity, Image } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { Timer, Calendar, Header, AlertBox } from 'src/components';
import { isAndroid, isIos } from 'src/utils';
import { useConnectNotification } from 'src/hooks';
import { themeAtom } from 'src/atoms';

import { Logo, WhiteLogo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();

  const themeValue = useRecoilValue(themeAtom);

  const { mutate } = useConnectNotification();

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

  return (
    <S.HomeScreenWrapper>
      <Header isRow>
        <Image
          source={themeValue === 'light' ? Logo : WhiteLogo}
          style={{ width: 98, height: 30, resizeMode: 'contain' }}
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
      </Header>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          navigateUrl="LunchTable"
          icon="🍽"
          subText="오늘의 급식!"
          mainText="실시간으로 보기"
        />
        <Timer />
        <Calendar />
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
