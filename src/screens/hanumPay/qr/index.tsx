import React from 'react';
import { BarCodeReadEvent } from 'react-native-camera';

import { HanumPayHeader, QRScanner } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = ({ data }: BarCodeReadEvent) => {
    console.log(data);
  };
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRScanner onSuccess={onSuccess} />
    </S.HanumPayQRWrapper>
  );
};
