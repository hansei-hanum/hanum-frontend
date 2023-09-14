import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { isIos } from 'src/utils';
import { Text } from 'src/components/common';
import { colors } from 'src/styles';

import * as S from './styled';

export interface QRScannerProps {
  onSuccess: (e: BarCodeReadEvent) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onSuccess }) => {
  const options = {
    onRead: onSuccess,
    showMarker: true,
    vibrate: false,
    customMarker: (
      <S.HanumPayQRBoxContainer>
        <Text.Column>
          <Text size={16} isCenter color={colors.white}>
            한움페이 결제 QR코드를 {'\n'}아래 상자에 맞춰주세요
          </Text>
        </Text.Column>
        <S.HanumPayQrBox>
          <S.HanumPayQrBoxContainer>
            <S.HanumPayQRBoxLeftTop />
            <S.HanumPayQRBoxRightTop />
          </S.HanumPayQrBoxContainer>
          <S.HanumPayQrBoxContainer>
            <S.HanumPayQRBoxLeftBottom />
            <S.HanumPayQRBoxRightBottom />
          </S.HanumPayQrBoxContainer>
        </S.HanumPayQrBox>
      </S.HanumPayQRBoxContainer>
    ),
  };

  if (isIos) {
    return (
      <QRCodeScanner
        {...options}
        fadeIn={false}
        containerStyle={{ flex: 1, height: '100%' }}
        cameraStyle={{ flex: 1, height: '100%', width: '100%' }}
      />
    );
  } else {
    return (
      <QRCodeScanner
        {...options}
        fadeIn={true}
        containerStyle={{ flex: 1, height: '100%' }}
        cameraStyle={{ flex: 1, height: '100%', width: '100%' }}
      />
    );
  }
};
