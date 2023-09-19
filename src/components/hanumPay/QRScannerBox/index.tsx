import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface QRScannerProps {
  text: string;
}

const QRScannerContent: React.FC<QRScannerProps> = ({ text }) => {
  return (
    <S.HanumPayQRBoxContainer>
      <Text.Column>
        <Text size={16} isCenter color={colors.white}>
          {text}
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
  );
};

export interface QRScannerBoxProps {
  children: React.ReactNode;
}

const QRScannerBoxPermission: React.FC<QRScannerBoxProps> = ({ children }) => {
  return <S.HanumPayQRBoxPermission>{children}</S.HanumPayQRBoxPermission>;
};

export const QRScannerBox = Object.assign(QRScannerContent, {
  Permission: QRScannerBoxPermission,
});
