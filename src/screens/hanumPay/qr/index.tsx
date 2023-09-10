import React, { useMemo, useRef, useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { BarCodeReadEvent } from 'react-native-camera';

import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import { useSetRecoilState } from 'recoil';

import { Button, HanumPayHeader, QRScanner, Text } from 'src/components';
import { colors } from 'src/styles';
import { checkNumber, formattedMoney } from 'src/utils';
import { useNavigate } from 'src/hooks';
import { hanumPayState } from 'src/atoms';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [money, setMoney] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const setHanumPay = useSetRecoilState(hanumPayState);

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
    const formattingMoney = formattedMoney(money);
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setIsActive(false);
    }, 70);
    setHanumPay({
      money: formattingMoney,
      status: true,
      message: '남은 한움페이 잔액은 9,000원이에요.',
    });
    navigate('HanumPayStatus');
  };

  const onMoneyChange = (money: string) => {
    const newMoney = checkNumber(money);
    if (newMoney.length > 0) setIsDisabled(false);
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
                부스{' '}
                <Text size={16} fontFamily="bold">
                  “사격장"{' '}
                </Text>
                의 QR코드가 인식되었어요!{'\n'}
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
            <Button isDisabled={isDisabled} onPress={onSubmit}>
              결제하기
            </Button>
          </S.HanumPayQRMoneyContainer>
        </BottomSheet>
      )}
    </S.HanumPayQRWrapper>
  );
};
