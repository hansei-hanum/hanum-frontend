import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { isIos } from 'src/utils';

import { QRScannerBox } from '../QRScannerBox';

export interface QRScannerProps {
  onSuccess: (e: BarCodeReadEvent) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onSuccess }) => {
  const options = {
    onRead: onSuccess,
    showMarker: true,
    vibrate: false,
    customMarker: <QRScannerBox text={'한움페이 결제 QR코드를\n' + '아래 상자에 맞춰주세요'} />,
  };

  if (isIos) {
    return (
      <QRCodeScanner
        {...options}
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
