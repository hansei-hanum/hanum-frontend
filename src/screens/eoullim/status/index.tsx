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
  const { userData } = useGetUser();
  const message = luckyNumber
    ? `${userData.name}님의 추첨번호는 ${'\n'} "76"번 입니다.`
    : '추첨번호를 받지 못했어요.';

  return (
    <Status navigateUrl="Main">
      {luckyNumber ? (
        <S.RaffleStatusWrapper>
          <Text size={40} fontFamily="bold" isCenter color={colors.white}>
            {luckyNumber}
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
