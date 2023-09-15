import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const QRScannerBox: React.FC = () => {
  return (
    <S.HanumPayQRBoxWrapper>
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
    </S.HanumPayQRBoxWrapper>
  );
};
