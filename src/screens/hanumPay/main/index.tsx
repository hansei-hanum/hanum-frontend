import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Button, Text, HanumPayHeader, AuthFailedModal } from 'src/components';
import { colors } from 'src/styles';
import { useCheckUserType, useGetPaymentDetail, useNavigate } from 'src/hooks';
import { formattedMoney, isIos } from 'src/utils';

import * as S from './styled';

export const HanumPayMainScreen: React.FC = () => {
  const navigate = useNavigate();

  const payData = useGetPaymentDetail();
  const paymentData = payData.data?.data;
  const paymentLoading = payData.isLoading;

  const { isStudent, modalVisible, setModalVisible } = useCheckUserType();

  const formattedTime = (now: Date, hour: number, minute: number) => {
    const minutes = now.getHours() * 60 + now.getMinutes(); // 현재 시간을 분으로 환산
    const targetMinutes = hour * 60 + minute; // 목표 시간을 분으로 환산
    const diff = minutes - targetMinutes; // 목표 시간과 현재 시간의 차이
    const diffHour = Math.floor(diff / 60) > 0 ? `${Math.floor(diff / 60)}시간` : '';
    return `${diffHour} ${diff % 60}분 전`;
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      payData.refetch();
    }
  }, [isFocused]);

  if (isStudent) {
    return (
      <S.HanumPayWrapper>
        <S.HanumPayContainer>
          <HanumPayHeader title="한움페이" />
          <S.HanumPaySection>
            <Text.Column>
              <Text size={14} color={colors.placeholder}>
                한움페이 잔액
              </Text>
              {!paymentLoading ? (
                <Text size={28} fontFamily="bold">
                  {paymentData?.balanceAmount
                    ? formattedMoney(paymentData.balanceAmount.toString())
                    : '0'}
                  원
                </Text>
              ) : (
                <ActivityIndicator size={26} color={colors.primary} />
              )}
            </Text.Column>
            <Button onPress={() => navigate('HanumPayQR')}>결제하기</Button>
            <S.HanumUseAgeHistory>
              <Text size={18}>이용내역</Text>
              {!paymentLoading ? (
                <S.HanumUseAgeContainer
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'column',
                    paddingBottom: isIos ? 580 : 590,
                    rowGap: 20,
                  }}
                >
                  {paymentData?.payments && paymentData.payments.length > 0 ? (
                    paymentData.payments.map(
                      ({
                        status,
                        id,
                        boothName,
                        paidAmount,
                        refundedAmount,
                        paidTime,
                        refundedTime,
                      }) => {
                        const isPaid = status === 'paid';
                        const historyTime = new Date(isPaid ? paidTime : refundedTime);
                        const hour = historyTime.getHours();
                        const minute = historyTime.getMinutes();
                        return (
                          <S.HanumUseAgeDetails key={id}>
                            <Text.Column>
                              <Text size={17}>{boothName}</Text>
                              <Text size={15} color={colors.placeholder}>
                                {formattedTime(new Date(), hour, minute)}
                              </Text>
                            </Text.Column>
                            <Text size={18} color={colors.black}>
                              {isPaid ? paidAmount : refundedAmount}원
                            </Text>
                          </S.HanumUseAgeDetails>
                        );
                      },
                    )
                  ) : (
                    <Text size={16}>아직 이용내역이 없어요.</Text>
                  )}
                </S.HanumUseAgeContainer>
              ) : (
                <ActivityIndicator size={26} color={colors.primary} />
              )}
            </S.HanumUseAgeHistory>
          </S.HanumPaySection>
        </S.HanumPayContainer>
      </S.HanumPayWrapper>
    );
  } else {
    return (
      <>
        <S.HanumPayWrapper>
          <S.HanumPayContainer>
            <HanumPayHeader title="한움페이" />
          </S.HanumPayContainer>
        </S.HanumPayWrapper>
        <AuthFailedModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          isStudent={true}
        />
      </>
    );
  }
};
