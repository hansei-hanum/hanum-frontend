import React, { useMemo, useRef } from 'react';
import { Easing } from 'react-native-reanimated';

import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Button, HanumPayHeader, QRScanner, Text } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['34%', '34%'], []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 300,
    easing: Easing.out(Easing.exp),
  });

  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRScanner />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        animationConfigs={animationConfigs}
      >
        <S.PrivacyTabContentContainer>
          <Text.Column>
            <Text size={20} fontFamily="bold" isCenter>
              결제하기
            </Text>
            <Text size={16} isCenter>
              부스 “사격장"의 QR코드가 인식되었어요!{'\n'}
              해당 부스에 얼마를 결제할까요?
            </Text>
          </Text.Column>
          <Button>결제하기</Button>
        </S.PrivacyTabContentContainer>
      </BottomSheet>
    </S.HanumPayQRWrapper>
  );
};
