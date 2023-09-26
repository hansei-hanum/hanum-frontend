import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useGetUser } from './query';

export const useCheckUserType = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { verifyUser } = useGetUser();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !verifyUser) {
      setModalVisible(true);
    }
  }, [isFocused]);

  return {
    modalVisible,
    setModalVisible,
    verifyUser,
  };
};
