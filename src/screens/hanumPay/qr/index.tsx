import React from 'react';

import { HanumPayHeader, QRScanner } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRScanner />
    </S.HanumPayQRWrapper>
  );
};
