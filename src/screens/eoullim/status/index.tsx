import React from 'react';

import { useRecoilValue } from 'recoil';

import { Status, Text } from 'src/components';
import { colors } from 'src/styles';
import { useGetUser } from 'src/hooks';
import { FailedLottie } from 'src/assets';
import { luckyNumberAtom } from 'src/atoms/luckyNumber';

import * as S from './styled';

export const EoullimStatusScreen: React.FC = () => {
  const luckyNumber = useRecoilValue(luckyNumberAtom);
  const { userData } = useGetUser();
  const message =
    luckyNumber.number > 0
      ? `${userData.name}님의 추첨번호에요. ${'\n'} 행운을 빌어요!`
      : `${luckyNumber.errorMessage}`;

  return (
    <Status navigateUrl="EoullimMain">
      {luckyNumber.number > 0 ? (
        <S.RaffleStatusWrapper>
          <Text size={60} fontFamily="bold" isCenter color={colors.white}>
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
