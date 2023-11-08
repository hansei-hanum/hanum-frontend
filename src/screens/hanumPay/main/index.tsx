import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

import { Button, Text, HanumPayHeader, AuthFailedModal, Spinner } from 'src/components';
import { useCheckUserType, useGetPaymentDetail, useNavigate, useOnRefresh } from 'src/hooks';
import { formattedMoney, isIos } from 'src/utils';

import * as S from './styled';

export const HanumPayMainScreen: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { refreshing, onRefresh } = useOnRefresh();

  const payData = useGetPaymentDetail();
  const paymentData = payData.data?.data;
  const paymentLoading = payData.isLoading;

  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();

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

  if (verifyUser) {
    return (
      <S.HanumPayWrapper>
        <S.HanumPayContainer>
          <HanumPayHeader title="한움페이" />
          <S.HanumPaySection>
            <Text.Column>
              <Text size={14} color={theme.placeholder}>
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
                <Spinner />
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
                    paddingBottom: isIos ? 580 : 590,
                    rowGap: 20,
                  }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                            <S.HanumUseAgeTextLeftContainer>
                              <Text size={17}>{boothName}</Text>
                              <Text size={15} color={theme.placeholder}>
                                {formattedTime(new Date(), hour, minute)}
                              </Text>
                            </S.HanumUseAgeTextLeftContainer>
                            <S.HanumUseAgeTextContainer>
                              <Text size={18} color={theme.default}>
                                {isPaid
                                  ? `-${paidAmount && formattedMoney(paidAmount.toString())}`
                                  : `${
                                      refundedAmount && formattedMoney(refundedAmount.toString())
                                    }`}
                                원
                              </Text>
                              <Text size={15} color={theme.placeholder}>
                                ({isPaid ? '결제됨' : '환불됨'})
                              </Text>
                            </S.HanumUseAgeTextContainer>
                          </S.HanumUseAgeDetails>
                        );
                      },
                    )
                  ) : (
                    <Text size={16}>아직 이용내역이 없어요.</Text>
                  )}
                </S.HanumUseAgeContainer>
              ) : (
                <Spinner />
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
        <AuthFailedModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </>
    );
  }
};
