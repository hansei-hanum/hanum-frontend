import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { AppLayout } from 'src/components';
import { checkNumber, isAndroid } from 'src/utils';
import { usePayment } from 'src/hooks';
import { boothAtom, isDisableAtom, themeAtom } from 'src/atoms';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const theme = useTheme();
  const themeValue = useRecoilValue(themeAtom);

  const [money, setMoney] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const boothInfo = useRecoilValue(boothAtom);

  const { mutate, isLoading } = usePayment();

  const onSubmit = () => {
    if (!isLoading && boothInfo.id !== 0 && !isButtonDisabled) {
      setIsButtonDisabled(true);
      mutate({ amount: parseInt(money), boothId: boothInfo.id });
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    }
  };

  const onMoneyChange = (money: string) => {
    const newMoney = checkNumber(money);
    if (newMoney.length > 0) setIsDisabled(false);
    setMoney(newMoney);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsDisabled(true);
      setIsButtonDisabled(false);
    }
  }, [isFocused]);

  return (
    <AppLayout
      isLoading={isLoading}
      onPress={onSubmit}
      headerText={`${boothInfo.name}에` + '\n얼마를 결제할까요?'}
      bottomText="결제하기"
      buttonDisabled={isButtonDisabled}
    >
      <S.TextFieldFormInput
        placeholderTextColor={themeValue === 'light' ? 'black' : 'white'}
        variant="standard"
        label="결제 금액"
        keyboardType="numeric"
        onChangeText={onMoneyChange}
        color={themeValue === 'light' ? 'black' : 'white'}
        value={money}
        inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
        inputStyle={{ fontSize: 20, color: themeValue === 'light' ? 'black' : 'white' }}
      />
    </AppLayout>
  );
};
