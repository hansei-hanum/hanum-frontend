/* eslint-disable @typescript-eslint/no-explicit-any */
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { HanumPayHeader } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const onSuccess = (e: any) => {
    // 바코드가 감지되면 실행되는 함수
    console.log(e, 'data');
    Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
  };
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        // remove animate
        fadeIn={false}
        showMarker={true}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>QR코드</Text>를 스캔해주세요.
          </Text>
        }
        cameraStyle={{ flex: 1, height: '100%', width: '100%' }}
      />
    </S.HanumPayQRWrapper>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
