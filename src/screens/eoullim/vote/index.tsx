import React, { useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from '@react-native-material/core';

import { Button, EoullimVoteComponent, CommonHeader, Modal, Text } from 'src/components';
import { colors } from 'src/styles';
import { useGetVote, useVote } from 'src/hooks/query/eoullim';

import * as S from './styled';

export const EoullimVoteScreen: React.FC = () => {
  const { isLoading, data } = useGetVote();
  const hasData = !isLoading && data;

  const { mutate } = useVote();

  const now = new Date();
  const startTime = hasData && new Date(data.data.startAt);
  const endTime = hasData && new Date(data.data.endAt);

  const exitsTime = startTime && endTime;

  const voteTime =
    exitsTime && now.getTime() >= startTime.getTime() && now.getTime() <= endTime.getTime();
  const [isProceeding, setIsProceeding] = useState<boolean>(true);
  const [isImminent, setIsImminent] = useState<boolean>(false);
  const [voteLeftTime, setVoteLeftTime] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleItemClick = (id: number) => {
    setSelectedItem(selectedItem === id ? null : id);
    if (data) {
      mutate({ id: data.data.id, fieldId: id });
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
      !voteTime && setModalVisible(true);
      setInterval(onUpdate, 1000);
      onUpdate();
    }
  }, [isFocused]);

  if (voteTime) {
    return (
      <S.EoullimVoteWrapper>
        <S.EoullimVoteContainer>
          <CommonHeader />
          {!isLoading ? (
            <>
              <S.EoullimVoteHeader>
                <S.EoullimVoteStatusContainer>
                  <S.EoullimVoteStatusCircle
                    style={{ backgroundColor: isProceeding ? colors.green : colors.brown }}
                  />
                  <Text size={15} fontFamily="bold">
                    {isProceeding ? '투표 진행 중' : '투표 종료'}
                  </Text>
                </S.EoullimVoteStatusContainer>
                <Text.Column>
                  <Text size={24} fontFamily="bold">
                    학생공연팀{'\n'}
                    투표를 {isProceeding ? '진행해주세요!' : '종료되었어요'}
                  </Text>
                  {!isProceeding && (
                    <Text size={15} fontFamily="bold">
                      총 {data.data.total}표가 투표되었어요.
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
                    <Text
                      size={40}
                      fontFamily="bold"
                      color={isImminent ? colors.danger : colors.black}
                    >
                      {voteLeftTime}
                    </Text>
                  </S.EoullimVoteTimeContainer>
                  <S.EoullimVoteList>
                    {data.data.fileds.map(({ id, value }) => (
                      <EoullimVoteComponent
                        key={id}
                        name={value}
                        isSelect={selectedItem === id ? true : false}
                        onPress={() => handleItemClick(id)}
                      />
                    ))}
                  </S.EoullimVoteList>
                </>
              )}
            </>
          ) : (
            <ActivityIndicator size={26} />
          )}
        </S.EoullimVoteContainer>
      </S.EoullimVoteWrapper>
    );
  } else {
    return (
      <Modal
        title="투표 "
        text={'지금은 진행 중인 투표가 없어요.\n' + '나중에 다시 시도해 보세요.'}
        modalVisible={modalVisible}
        button={
          <Button
            onPress={() => {
              navigation.goBack();
              setModalVisible(false);
            }}
          >
            확인
          </Button>
        }
      />
    );
  }
};
