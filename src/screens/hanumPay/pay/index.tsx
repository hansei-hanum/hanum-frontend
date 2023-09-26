import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Auth } from 'src/components';
import { colors } from 'src/styles';
import { checkNumber, isAndroid } from 'src/utils';
import { usePayment } from 'src/hooks';
import { boothState } from 'src/atoms';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const [money, setMoney] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const boothInfo = useRecoilValue(boothState);

  const { mutate } = usePayment();

  const onSubmit = () => {
    console.log('asd')
    boothInfo.id !== 0 && mutate({ amount: parseInt(money), boothId: boothInfo.id });
  };

  const onMoneyChange = (money: string) => {
    const newMoney = checkNumber(money);
    if (newMoney.length > 0) setIsDisabled(false);
    setMoney(newMoney);
  };

  return (
    <Auth
      isDisabled={isDisabled}
      onPress={onSubmit}
      headerText={`${boothInfo.name}에` + '\n얼마를 결제할까요?'}
      bottomText="결제하기"
    >
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
    </Auth>
  );
};
