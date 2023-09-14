import React from 'react';

import { Button, Text, HanumPayHeader } from 'src/components';
import { colors } from 'src/styles';
import { useGetPaymentDetail, useNavigate } from 'src/hooks';
import { formattedMoney } from 'src/utils';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGetPaymentDetail();
  const paymentData = data?.data;

  return (
    <S.HanumPayWrapper>
      <S.HanumPayContainer>
        <HanumPayHeader title="한움페이" />
        <S.HanumPaySection>
          <Text.Column>
            <Text size={14} color={colors.placeholder}>
              한움페이 잔액
            </Text>
            <Text size={28} fontFamily="bold">
              {paymentData?.balanceAmount
                ? formattedMoney(paymentData.balanceAmount.toString())
                : '0'}
              원
            </Text>
          </Text.Column>
          <Button onPress={() => navigate('HanumPayQR')}>결제하기</Button>
          <S.HanumUsageHistory>
            <Text size={18}>이용내역</Text>
            {paymentData?.payments && paymentData.payments.length > 0 ? (
              <S.HanumUsageDetails>
                <Text.Column>
                  <Text size={17}>충전</Text>
                  <Text size={15} color={colors.placeholder}>
                    학생회 환전소
                  </Text>
                </Text.Column>
                <Text size={18} color={colors.black}>
                  10,000원
                </Text>
              </S.HanumUsageDetails>
            ) : (
              <Text size={16}>아직 이용내역이 없어요.</Text>
            )}
          </S.HanumUsageHistory>
        </S.HanumPaySection>
      </S.HanumPayContainer>
    </S.HanumPayWrapper>
  );
};
