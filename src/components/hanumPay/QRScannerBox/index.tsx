import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

const QRScannerContent: React.FC = () => {
  return (
    <S.HanumPayQRBoxContainer>
      <Text.Column>
        <Text size={16} isCenter color={colors.white}>
          교직원 인증 비콘 QR코드를 {'\n'}아래 상자에 맞춰주세요
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
