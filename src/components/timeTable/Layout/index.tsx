import React, { useState, useRef } from 'react';

import { Header, Text, TimeTableBottomSheet } from 'src/components';
import { useGetUser } from 'src/hooks';

import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import * as S from './styled';

export interface TimeTableLayoutProps {
  isStudent?: boolean;
  children: React.ReactNode;
}

export const TimeTableLayout: React.FC<TimeTableLayoutProps> = ({ isStudent, children }) => {
  const { classroom, grade, department } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.TimeTableContainer>
      <Header hasIconContainer={{ icon: '⏰', text: '시간표' }}>
        {isStudent && (
          <S.TimeTableIconContainer activeOpacity={0.8} onPress={toggleModal}>
            <Text size={17}>
              {department} {grade}학년 {classroom}반
            </Text>
            <Icon name="chevron-down" size={18} color={theme.default} />
          </S.TimeTableIconContainer>
        )}
      </Header>
      {children}
      <TimeTableBottomSheet modalVisible={isOpen} setModalVisible={setIsOpen} />
    </S.TimeTableContainer>
  );
};
