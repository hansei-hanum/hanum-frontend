import React, { useEffect, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

import { Auth } from 'src/components';
import { checkNumber, isAndroid } from 'src/utils';
import { usePayment } from 'src/hooks';
import { boothAtom, isDisableAtom } from 'src/atoms';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const theme = useTheme();
  const [money, setMoney] = useState<string>('');
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const boothInfo = useRecoilValue(boothAtom);

  const { mutate, isLoading } = usePayment();

  const onSubmit = () => {
    boothInfo.id !== 0 && mutate({ amount: parseInt(money), boothId: boothInfo.id });
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
    }
  }, [isFocused]);

  return (
    <Auth
      isLoading={isLoading}
      onPress={onSubmit}
      headerText={`${boothInfo.name}에` + '\n얼마를 결제할까요?'}
      bottomText="결제하기"
    >
      <S.TextFieldFormInput
        placeholderTextColor={theme.placeholder}
        variant="standard"
        label="결제 금액"
        keyboardType="numeric"
        onChangeText={onMoneyChange}
        color={theme.placeholder}
        value={money}
        inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
        inputStyle={{ fontSize: 20 }}
      />
    </Auth>
  );
};
