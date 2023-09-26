import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { isIos } from 'src/utils';

import { QRScannerBox } from '../QRScannerBox';

export interface QRScannerProps {
  onSuccess: (e: BarCodeReadEvent) => void;
  qrName: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onSuccess, qrName }) => {
  const options = {
    onRead: onSuccess,
    showMarker: true,
    vibrate: false,
    reactivate: true,
    customMarker: <QRScannerBox qrName={qrName} />,
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
