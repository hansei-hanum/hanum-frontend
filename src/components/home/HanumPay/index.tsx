import React from 'react';

import { useTheme } from '@emotion/react';

import { Button, Content, Spinner, Text } from 'src/components';
import { formattedMoney, isIos } from 'src/utils';
import { useGetPaymentAmount, useNavigate } from 'src/hooks';

import * as S from './styled';

export interface HanumPayButton {
  onPress: () => void;
  text: string;
}

export const HanumPayButton: React.FC<HanumPayButton> = ({ onPress, text }) => {
  const theme = useTheme();

  return (
    <S.HanumPayButton activeOpacity={0.4} onPress={onPress}>
      <Text size={isIos ? 15 : 14} fontFamily="bold" color={theme.default}>
        {text}
      </Text>
    </S.HanumPayButton>
  );
};

export const HanumPay: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { isLoading, data } = useGetPaymentAmount();
  const balanceAmount = data?.data?.balanceAmount;

  return (
    <Content icon="💳" name="한움페이" navigateUrl="HanumPayMain">
      <S.HanumPayContainer>
        {!isLoading ? (
          <Text size={24} fontFamily="bold" color={theme.default}>
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
