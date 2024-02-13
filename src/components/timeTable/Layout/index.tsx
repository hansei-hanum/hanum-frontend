import React from 'react';

import { Header, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { ScheduleIcon } from 'src/assets';

import * as S from './styled';

export interface TimeTableLayoutProps {
  isStudent?: boolean;
  children: React.ReactNode;
}

export const TimeTableLayout: React.FC<TimeTableLayoutProps> = ({ isStudent, children }) => {
  const { classroom, grade, department } = useGetUser();

  return (
    <S.TimeTableContainer>
      <Header hasIconContainer={{ icon: ScheduleIcon, text: '시간표' }}>
        {isStudent && (
          <Text size={17}>
            {department} {grade}학년 {classroom}반
          </Text>
        )}
      </Header>
      {children}
    </S.TimeTableContainer>
  );
};
