import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useGetUser } from './query';

export const useCheckUserType = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { userType, verifyUser } = useGetUser();
  const isStudent = userType() === '재학생';
  const isFocused = useIsFocused();

  useEffect(() => {
    if ((isFocused && !isStudent) || (isFocused && !verifyUser)) {
      setModalVisible(true);
    }
  }, [isFocused]);

  return {
    isStudent,
    modalVisible,
    setModalVisible,
    verifyUser,
  };
};
