import React from 'react';
import { WithLocalSvg } from 'react-native-svg';

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
      <Header>
        <S.TimeTableIconContainer>
          <WithLocalSvg width={32} height={32} asset={ScheduleIcon} />
          <Text size={20} fontFamily="bold">
            시간표
          </Text>
        </S.TimeTableIconContainer>
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
