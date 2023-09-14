import React, { useMemo, useRef, useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { BarCodeReadEvent } from 'react-native-camera';

import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Button, HanumPayHeader, QRScanner, Text } from 'src/components';
import { colors } from 'src/styles';
import { checkNumber, isAndroid } from 'src/utils';
import { usePayment } from 'src/hooks';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [money, setMoney] = useState<string>('');
  const [boothId, setBoothId] = useState<null | number>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { mutate } = usePayment();

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = ({ data }: BarCodeReadEvent) => {
    console.log(data);
    setBoothId(parseInt(data));
    setIsActive(true);
  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['38%', '38%'], []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 300,
    easing: Easing.out(Easing.exp),
  });

  const onSubmit = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setIsActive(false);
    }, 70);
    // boothId && mutate({ amount: parseInt(money), boothId: boothId });
    mutate({ amount: parseInt(money), boothId: 1 });
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
      {!isActive && (
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
            <Text.Column>
              <S.TextFieldFormInput
                placeholderTextColor={colors.placeholder}
                variant="standard"
                label="결제 금액"
                keyboardType="numeric"
                onChangeText={onMoneyChange}
                color={colors.placeholder}
                value={money}
                inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
                inputStyle={{ fontSize: 20 }}
              />
            </Text.Column>
            <Button isDisabled={isDisabled} onPress={onSubmit}>
              결제하기
            </Button>
          </S.HanumPayQRMoneyContainer>
        </BottomSheet>
      )}
    </S.HanumPayQRWrapper>
  );
};
