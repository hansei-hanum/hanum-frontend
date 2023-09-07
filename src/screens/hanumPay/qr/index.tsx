import React, { useMemo, useRef, useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { BarCodeReadEvent } from 'react-native-camera';

import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Button, HanumPayHeader, QRScanner, Text } from 'src/components';
import { colors } from 'src/styles';
import { checkNumber } from 'src/utils';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [money, setMoney] = useState<string>('');

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = (e: BarCodeReadEvent) => {
    console.log(e, 'data');
    setIsActive(true);
  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['34%', '34%'], []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 300,
    easing: Easing.out(Easing.exp),
  });

  const onSubmit = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setIsActive(false);
    }, 70);
  };

  const onMoneyChange = (money: string) => {
    const newMoney = checkNumber(money);
    setMoney(newMoney);
  };

  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      <QRScanner onSuccess={onSuccess} />
      {isActive && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          animationConfigs={animationConfigs}
        >
          <S.HanumPayQRMoneyContainer>
            <Text.Column>
              <Text size={20} fontFamily="bold" isCenter>
                결제하기
              </Text>
              <Text size={16} isCenter>
                부스 “사격장"의 QR코드가 인식되었어요!{'\n'}
                해당 부스에 얼마를 결제할까요?
              </Text>
            </Text.Column>
            <S.TextFieldFormInput
              placeholderTextColor={colors.placeholder}
              placeholder="결제할 금액을 입력해주세요."
              keyboardType="numeric"
              onChangeText={onMoneyChange}
              value={money}
            />
            <Button onPress={onSubmit}>결제하기</Button>
          </S.HanumPayQRMoneyContainer>
        </BottomSheet>
      )}
    </S.HanumPayQRWrapper>
  );
};
