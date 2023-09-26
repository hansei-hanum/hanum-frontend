import React, { useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from '@react-native-material/core';

import { Button, EoullimVoteComponent, CommonHeader, Modal, Text } from 'src/components';
import { colors } from 'src/styles';
import { useGetVote, useVote } from 'src/hooks/query/eoullim';

import * as S from './styled';

export const EoullimVoteScreen: React.FC = () => {
  const getVote = useGetVote();
  const getVoteData = !getVote.isLoading && getVote?.data?.data;

  const { mutate } = useVote();

  const now = new Date();
  const startTime = getVoteData && new Date(getVoteData?.startAt);
  const endTime = getVoteData && new Date(getVoteData?.endAt);

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
    getVote.refetch();
    setSelectedItem(selectedItem === id ? null : id);
    if (getVoteData) {
      mutate({ id: getVoteData.id, fieldId: id });
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

  if (getVote.isLoading) {
    return <ActivityIndicator size={40} />;
  } else if (voteTime) {
    return (
      <S.EoullimVoteWrapper>
        <S.EoullimVoteContainer>
          <CommonHeader />
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
                  <Text
                    size={40}
                    fontFamily="bold"
                    color={isImminent ? colors.danger : colors.black}
                  >
                    {voteLeftTime}
                  </Text>
                </S.EoullimVoteTimeContainer>
                <S.EoullimVoteList
                  contentContainerStyle={{ rowGap: 6 }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {getVoteData.fields.map(({ id, value }) => {
                    const checkMyVote = getVoteData.myVote?.fieldId === id;
                    const checkSelectedItem = selectedItem === id;
                    return (
                      <EoullimVoteComponent
                        key={id}
                        name={value}
                        isSelect={checkSelectedItem ? !checkMyVote && true : false}
                        onPress={() => handleItemClick(id)}
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
