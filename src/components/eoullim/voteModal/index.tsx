import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Button, Modal } from 'src/components/common';

export interface VoteModalProps {
  getVoteData?: boolean;
}

export const VoteModal: React.FC<VoteModalProps> = ({ getVoteData }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (!getVoteData) {
      setModalVisible(true);
    }
  }, []);
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
};
