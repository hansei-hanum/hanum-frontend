import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';
import { Alert, Linking, PermissionsAndroid, TouchableOpacity } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import { AlertBox, HanumPay, Timer, Calendar, Header } from 'src/components';
import { colors } from 'src/styles';
import { iosCheckHeight, isAndroid, isIos } from 'src/utils';
import { PartyIcon } from 'src/assets';

import { Logo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  async function requestUserPermission() {
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
      console.log('User has notification permissions granted.');
      console.log('FCM Token:', await messaging().getToken());
    }
  }

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
    messaging()
      .subscribeToTopic('announcement')
      .then(() => console.log('전체 공지사항 채널 구독 성공'));
  }, []);
  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: iosCheckHeight ? 70 : 90,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          icon={PartyIcon}
          mainText="실시간으로 즐기기"
          subText="한세어울림한마당 진행 중!"
          navigateUrl="Main"
        />
        <HanumPay />
        <Timer />
        <Calendar />
      </S.HomeScreenContainer>
      <Header>
        <WithLocalSvg width={98} height={40} asset={Logo} color={colors.placeholder} />
        <S.HomeScreenHeaderIconContainer>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Linking.openURL('kakaoplus://plusfriend/talk/chat/405758775').catch(() =>
                Alert.alert(
                  '문의하기',
                  '카카오톡이 설치되어 있지 않아요. 문의하기를 이용하려면 카카오톡을 설치해주세요.',
                  [{ text: '확인' }],
                ),
              );
            }}
          >
            <AntDesign name="customerservice" size={28} color={colors.placeholder} />
          </TouchableOpacity>
        </S.HomeScreenHeaderIconContainer>
      </Header>
    </S.HomeScreenWrapper>
  );
};
