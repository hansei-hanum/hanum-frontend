import React, { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

import { useIsFocused } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { useTheme } from '@emotion/react';

import { GoBackHeader, Text } from 'src/components/common';
import { APIErrorResponse, APIResponse, EoullimVoteResponse } from 'src/api';
import { useVote } from 'src/hooks';

import { EoullimVoteBox } from '../voteBox';

import * as S from './styled';

export interface EoullimVoteProps {
  getVote: UseQueryResult<APIResponse<EoullimVoteResponse>, AxiosError<APIErrorResponse>>;
  getVoteData: EoullimVoteResponse;
}

export const EoullimVote: React.FC<EoullimVoteProps> = ({ getVoteData, getVote }) => {
  const theme = useTheme();

  const [cursor, setCursor] = useState<number | null>(null);

  if (getVoteData && getVoteData.myVote && cursor === null) {
    setCursor(getVoteData.fields.findIndex(({ id }) => id === getVoteData.myVote?.fieldId));
  }

  const startTime = getVoteData && new Date(getVoteData?.startAt);
  const endTime = getVoteData && new Date(getVoteData?.endAt);

  const exitsTime = startTime && endTime;

  const [isProceeding, setIsProceeding] = useState<boolean>(true);
  const [isImminent, setIsImminent] = useState<boolean>(false);
  const [voteLeftTime, setVoteLeftTime] = useState<string>('');

  const { mutate } = useVote();

  const handleItemClick = (index: number) => {
    getVote.refetch();
    setCursor(index);
    if (getVoteData) {
      mutate({ id: getVoteData.id, fieldId: getVoteData.fields[index].id });
    }
  };

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
    if (exitsTime) {
      const time = getTimeRemaining(now, +endTime.getHours(), +endTime.getMinutes());
      setVoteLeftTime(time);
      setIsProceeding(time === '-' ? false : true);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setInterval(onUpdate, 1000);
      onUpdate();
    }
  }, [isFocused]);

  return (
    <S.EoullimVoteWrapper>
      <GoBackHeader />
      <S.EoullimVoteContainer>
        <>
          <S.EoullimVoteHeader>
            <S.EoullimVoteStatusContainer>
              <S.EoullimVoteStatusCircle
                style={{ backgroundColor: isProceeding ? theme.green : theme.brown }}
              />
              <Text size={15} fontFamily="bold">
                {isProceeding ? '투표 진행 중' : '투표 종료'}
              </Text>
            </S.EoullimVoteStatusContainer>
            <Text.Column>
              <Text size={24} fontFamily="bold">
                {getVoteData.title}
                {'\n'}
                투표{isProceeding ? '를 진행해주세요!' : '가 종료되었어요'}
              </Text>
              {!isProceeding && (
                <Text size={15} fontFamily="bold">
                  총 {getVoteData.total}표가 투표되었어요.
                </Text>
              )}
            </Text.Column>
          </S.EoullimVoteHeader>
          {isProceeding && (
            <>
              <S.EoullimVoteTimeContainer>
                <Text size={15} fontFamily="bold">
                  투표 종료까지
                </Text>
                <Text size={40} fontFamily="bold" color={isImminent ? theme.danger : theme.default}>
                  {voteLeftTime}
                </Text>
              </S.EoullimVoteTimeContainer>
              <S.EoullimVoteList
                contentContainerStyle={{ rowGap: 6, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {getVoteData.fields.map(({ id, value }, i) => {
                  return (
                    <EoullimVoteBox
                      key={id}
                      name={value}
                      isSelect={cursor === i ? true : false}
                      onPress={() => handleItemClick(i)}
                    />
                  );
                })}
              </S.EoullimVoteList>
            </>
          )}
        </>
      </S.EoullimVoteContainer>
    </S.EoullimVoteWrapper>
  );
};
