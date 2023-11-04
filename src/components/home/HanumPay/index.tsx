import React from 'react';

import { Button, Content, Spinner, Text } from 'src/components';
import { colors } from 'src/styles';
import { formattedMoney, isIos } from 'src/utils';
import { useGetPaymentAmount, useNavigate } from 'src/hooks';

import * as S from './styled';

export interface HanumPayButton {
  onPress: () => void;
  text: string;
}

export const HanumPayButton: React.FC<HanumPayButton> = ({ onPress, text }) => {
  return (
    <S.HanumPayButton activeOpacity={0.4} onPress={onPress}>
      <Text size={isIos ? 15 : 14} fontFamily="bold" color={colors.black}>
        {text}
      </Text>
    </S.HanumPayButton>
  );
};

export const HanumPay: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useGetPaymentAmount();
  const balanceAmount = data?.data?.balanceAmount;

  return (
    <Content icon="💳" name="한움페이" navigateUrl="HanumPayMain">
      <S.HanumPayContainer>
        {!isLoading ? (
          <Text size={24} fontFamily="bold" color={colors.black}>
            {balanceAmount ? formattedMoney(balanceAmount.toString()) : '0'}원
          </Text>
        ) : (
          <Spinner />
        )}
        <Button onPress={() => navigate('HanumPayQR')}>결제하기</Button>
      </S.HanumPayContainer>
    </Content>
  );
};
