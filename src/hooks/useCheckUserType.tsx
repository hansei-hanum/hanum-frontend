import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useGetUser } from './useGetUser';

export const useCheckUserType = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { userType, verifyUser } = useGetUser();
  const isStudent = userType() === '재학생';
  const isTeacher = userType() === '교직원';
  const isFocused = useIsFocused();

  useEffect(() => {
    if ((isFocused && !isStudent) || (isFocused && !verifyUser)) {
      setModalVisible(true);
    }
  }, [isFocused]);

  return {
    isStudent,
    isTeacher,
    modalVisible,
    setModalVisible,
    verifyUser,
  };
};
