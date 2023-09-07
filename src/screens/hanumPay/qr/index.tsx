import { View } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

import { HanumPayHeader, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = (e: BarCodeReadEvent) => {
    console.log(e, 'data');
  };
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker={true}
        containerStyle={{ flex: 1, height: '100%' }}
        cameraStyle={{ flex: 1, height: '100%', width: '100%' }}
        customMarker={
          <View style={{ flexDirection: 'column', rowGap: 10 }}>
            <Text.Column>
              <Text size={16} isCenter color={colors.white}>
                한움페이 결제 QR코드를 {'\n'}아래 상자에 맞춰주세요
              </Text>
            </Text.Column>
            <S.HanumPayQRBox />
          </View>
        }
      />
    </S.HanumPayQRWrapper>
  );
};
