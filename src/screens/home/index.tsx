import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';
import { Linking, PermissionsAndroid, TouchableOpacity, Image } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import {
  Timer,
  Calendar,
  Header,
  DummyContainer,
  Modal,
  Button,
  HanumPay,
  AlertBox,
} from 'src/components';
import { colors } from 'src/styles';
import { iosCheckHeight, isAndroid, isIos } from 'src/utils';
import { useConnectNotification } from 'src/hooks';
import { EoullimIcon } from 'src/assets';

import { Logo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
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
    console.log('Before setting up message listener');
    await messaging().onMessage(async (remoteMessage) => {
      console.log('FCM Message Data:', remoteMessage);
      await Notifier.showNotification({
        title: remoteMessage.notification?.title || '알림',
        description: remoteMessage.notification?.body,
        duration: 3000,
        showAnimationDuration: 500,
        hideOnPress: false,
      });
      setMessageSent(true);
    });
    console.log('After setting up message listener');
  };

  useEffect(() => {
    requestUserPermission();
    messageListener();
    messaging()
      .subscribeToTopic('announcement')
      .then(() => console.log('전체 공지사항 채널 구독 성공'));
    if (
      (messageSent && messaging.AuthorizationStatus.NOT_DETERMINED) ||
      (messageSent && messaging.AuthorizationStatus.DENIED)
    ) {
      setModalVisible(true);
    }
  }, []);

  return (
    <>
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
            navigateUrl="EoullimMain"
            icon={EoullimIcon}
            subText="한세어울림한마당 진행 중!"
            mainText="실시간으로 즐기기"
          />
          <HanumPay />
          <Timer />
          <Calendar />
        </S.HomeScreenContainer>
        <Header>
          <Image source={Logo} style={{ width: 98, height: 40, resizeMode: 'contain' }} />
          <S.HomeScreenHeaderIconContainer>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                Linking.openURL('kakaoplus://plusfriend/talk/chat/405758775').catch(() =>
                  Linking.openURL('https://pf.kakao.com/_xkMcxdG'),
                );
              }}
            >
              <AntDesign name="customerservice" size={28} color={colors.placeholder} />
            </TouchableOpacity>
          </S.HomeScreenHeaderIconContainer>
        </Header>
      </S.HomeScreenWrapper>
      {modalVisible && (
        <>
          <DummyContainer />
          <Modal
            title="알림 권한"
            text="알림 수신을 위해서는 시스템 설정에서 알림 수신을 허용해주세요."
            modalVisible={modalVisible}
            button={<Button onPress={() => setModalVisible(false)}>확인</Button>}
          />
        </>
      )}
    </>
  );
};
