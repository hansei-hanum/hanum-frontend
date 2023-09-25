import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { EoullimHeader, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const EoullimVote: React.FC = () => {
  const [isProceeding, setIsProceeding] = useState<boolean>(true);
  const [isImminent, setIsImminent] = useState<boolean>(false); // 5분 남았을 때 true
  const [voteTime, setVoteTime] = useState<string>('');

  const getTimeRemaining = (now: Date, hour: number, minute: number) => {
    const seconds =
      (hour * 60 + minute) * 60 -
      (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());

    if (seconds <= 0) {
      return '-';
    }

    if (seconds <= 300) {
      setIsImminent(true);
    }

    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onUpdate = () => {
    const now = new Date();
    const time = getTimeRemaining(now, 11, 0);
    console.log(time);
    setVoteTime(time);
    setIsProceeding(time === '-' ? false : true);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setInterval(onUpdate, 1000);
    onUpdate();
  }, [isFocused]);

  return (
    <S.EoullimVoteWrapper>
      <S.EoullimVoteContainer>
        <EoullimHeader />
        <S.EoullimVoteStatusContainer>
          <S.EoullimVoteStatusCircle
            style={{ backgroundColor: isProceeding ? colors.green : colors.brown }}
          />
          <Text size={15} fontFamily="bold">
            {isProceeding ? '투표 진행 중' : '투표 종료 됨'}
          </Text>
        </S.EoullimVoteStatusContainer>
        <Text.Column>
          <Text size={22} fontFamily="bold">
            학생공연팀{'\n'}
            투표를 {isProceeding ? '진행해주세요!' : '종료되었어요'}
          </Text>
          {!isProceeding && (
            <Text size={15} fontFamily="bold">
              총 100표가 투표되었어요.
            </Text>
          )}
        </Text.Column>
        {isProceeding && (
          <S.EoullimVoteTimeContainer>
            <Text size={15} fontFamily="bold">
              투표 종료까지
            </Text>
            <Text size={36} fontFamily="bold" color={isImminent ? colors.danger : colors.black}>
              {voteTime}
            </Text>
          </S.EoullimVoteTimeContainer>
        )}
      </S.EoullimVoteContainer>
    </S.EoullimVoteWrapper>
  );
};
