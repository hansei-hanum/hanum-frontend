import React from 'react';

import { useRecoilValue } from 'recoil';

import { Status, Text } from 'src/components';
import { colors } from 'src/styles';
import { useGetUser } from 'src/hooks';
import { FailedLottie } from 'src/assets';
import { luckyNumberState } from 'src/atoms/luckyNumber';

import * as S from './styled';

export const EoullimStatusScreen: React.FC = () => {
  const luckyNumber = useRecoilValue(luckyNumberState);
  console.log(luckyNumber, 'asdf');
  const { userData } = useGetUser();
  const message =
    luckyNumber.number > 0
      ? `${userData.name}님의 추첨번호는 ${'\n'} "${luckyNumber.number}"번 입니다.`
      : `${luckyNumber.errorMessage}`;

  return (
    <Status navigateUrl="Main">
      {luckyNumber.number > 0 ? (
        <S.RaffleStatusWrapper>
          <Text size={40} fontFamily="bold" isCenter color={colors.white}>
            {luckyNumber.number}
          </Text>
        </S.RaffleStatusWrapper>
      ) : (
        <S.RaffleStatusLottie source={FailedLottie} autoPlay loop={false} speed={1.3} />
      )}
      <Text size={22} fontFamily="bold" isCenter>
        {message}
      </Text>
    </Status>
  );
};
