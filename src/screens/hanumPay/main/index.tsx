import React from 'react';

import { Button, Text } from 'src/components';
import { colors } from 'src/styles';
import { HanumPayHeader } from 'src/components/hanumPay';
import { useGetPayDetail, useNavigate } from 'src/hooks';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGetPayDetail();
  console.log(data, 'data');
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
              9,000원
            </Text>
          </Text.Column>
          <Button onPress={() => navigate('HanumPayQR')}>결제하기</Button>
          <S.HanumUsageHistory>
            <Text size={18}>이용내역</Text>
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
          </S.HanumUsageHistory>
        </S.HanumPaySection>
      </S.HanumPayContainer>
    </S.HanumPayWrapper>
  );
};
