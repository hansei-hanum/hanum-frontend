import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';
import { PermissionsAndroid, TouchableOpacity, Image, View } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { Timer, Schedule, Header, LunchTable, TimeTable, AlertBox } from 'src/components';
import { isAndroid, isIos, openContactChannel } from 'src/utils';
import { useConnectNotification } from 'src/hooks';
import { themeAtom } from 'src/atoms';

import { Logo, WhiteLogo } from '../../../assets/images';

import * as S from './styled';

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

  function parseQueryString(queryString: string): Record<string, string> {
    const params: Record<string, string> = {};
    const keyValuePairs = queryString.split('&');

    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      params[key] = value;
    });

    return params;
  }

  function parseDeeplink(url: string): ParsedURL | null {
    const protocol = 'hanum://';
    if (!url.startsWith(protocol)) {
      return null;
    }

    const pathAndParams = url.slice(protocol.length).split('?');
    const path = pathAndParams[0].split('/').filter(Boolean);
    const params = pathAndParams[1] ? parseQueryString(pathAndParams[1]) : null;

    return { path, params };
  }

  function handleOpenURL(url: string) {
    const linkInfo = parseDeeplink(url);
    if (linkInfo) {
      navigator.navigate({
        name: linkInfo.path[linkInfo.path.length - 1],
        params: linkInfo.params,
      } as never);
    }
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      //   setTimeout(() => {
      //     console.log('reset');
      //   setHanowlApply({
      //     team: { name: '', id: '' },
      //     aspiration: '',
      //     introduce: '',
      //     motive: '',
      //   });
      // }, 1000 * 3);
    }
  }, [isFocused]);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage.data) {
        handleOpenURL(`${remoteMessage.data.url}`);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data) {
          handleOpenURL(`${remoteMessage.data.url}`);
        }
      });
  }, []);

  return (
    <S.HomeScreenWrapper>
      <Header isRow>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={themeValue === 'light' ? Logo : WhiteLogo}
            style={{ width: 98, height: 30, resizeMode: 'contain' }}
          />
          <S.HomeScreenHeaderIconContainer>
            <TouchableOpacity activeOpacity={0.5} onPress={openContactChannel}>
              <AntDesign name="customerservice" size={28} color={theme.placeholder} />
            </TouchableOpacity>
          </S.HomeScreenHeaderIconContainer>
        </View>
      </Header>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 60,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          navigateUrl="TotoMain"
          icon="📢"
          subText="체육 대회가 진행중이에요"
          mainText="승부 예측 하러가기"
        />
        <TimeTable />
        <Timer />
        <LunchTable />
        <Schedule />
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
