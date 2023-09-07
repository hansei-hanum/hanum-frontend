/* eslint-disable @typescript-eslint/no-explicit-any */
import { Linking, PermissionsAndroid, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { HanumPayHeader } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const onSuccess = (e: any) => {
    // 바코드가 감지되면 실행되는 함수
    console.log(typeof e, 'data');
    Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
  };
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        // remove animate
        // fadeIn={false}
        showMarker={true}
        containerStyle={{ flex: 1, height: '100%', borderColor: 'red', borderWidth: 1 }}
        cameraStyle={{ flex: 1, height: '100%', width: '100%' }}
      />
    </S.HanumPayQRWrapper>
  );
};
