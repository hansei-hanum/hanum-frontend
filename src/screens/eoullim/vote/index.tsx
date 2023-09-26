import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from '@react-native-material/core';

import { Button, Modal, EoullimVote } from 'src/components';
import { colors } from 'src/styles';
import { useGetVote } from 'src/hooks/query/eoullim';

export const EoullimVoteScreen: React.FC = () => {
  const getVote = useGetVote();
  const getVoteData = !getVote.isLoading && getVote?.data?.data;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  if (getVote.isLoading) {
    return (
      <ActivityIndicator
        size={40}
        color={colors.placeholder}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
    );
  } else if (getVoteData) {
    return (
      <EoullimVote getVoteData={getVoteData} getVote={getVote} setModalVisible={setModalVisible} />
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
