import React, { useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Button, EoullimHeader, EoullimVoteComponent, Modal, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

const VOTE_LIST = ["최근원 학생의 '썸'", "조치원 학생의 '썸'", '응 몰라 학생의 너검무검'];

const endTime = '2023-09-25T15:59:00';

export const EoullimVoteScreen: React.FC = () => {
  const [isProceeding, setIsProceeding] = useState<boolean>(true);
  const [isImminent, setIsImminent] = useState<boolean>(false);
  const [voteTime, setVoteTime] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleItemClick = (item: string) => {
    setSelectedItem(selectedItem === item ? null : item);
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
    const time = getTimeRemaining(now, +endTime.slice(11, 13), +endTime.slice(14, 16));
    setVoteTime(time);
    setIsProceeding(time === '-' ? false : true);
  };

  const CheckTime = () => {
    const now = new Date();
    const currentTime = now.toISOString().slice(0, 19);
    const startTime = '2023-09-25T15:49:00';
    if (currentTime <= startTime || currentTime >= endTime) {
      console.log(currentTime, startTime, endTime);
      setModalVisible(true);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      CheckTime();
      setInterval(onUpdate, 1000);
      onUpdate();
    }
  }, [isFocused]);

  return (
    <S.EoullimVoteWrapper>
      {!modalVisible ? (
        <S.EoullimVoteContainer>
          <EoullimHeader />
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
                  총 100표가 투표되었어요.
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
                <Text size={40} fontFamily="bold" color={isImminent ? colors.danger : colors.black}>
                  {voteTime}
                </Text>
              </S.EoullimVoteTimeContainer>
              <S.EoullimVoteList>
                {VOTE_LIST.map((name) => (
                  <EoullimVoteComponent
                    key={name}
                    name={name}
                    isSelect={selectedItem === name ? true : false}
                    onPress={() => handleItemClick(name)}
                  />
                ))}
              </S.EoullimVoteList>
            </>
          )}
        </S.EoullimVoteContainer>
      ) : (
        <Modal
          title="투표 "
          text={'지금은 진행 중인 투표가 없어요.\n' + '나중에 다시 시도해 보세요.'}
          modalVisible={modalVisible}
          button={
            <Button
              onPress={() => {
                navigation.goBack(), setModalVisible(false);
              }}
            >
              확인
            </Button>
          }
        />
      )}
    </S.EoullimVoteWrapper>
  );
};
