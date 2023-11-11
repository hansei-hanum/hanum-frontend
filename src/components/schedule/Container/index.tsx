import React from 'react';
import { WithLocalSvg } from 'react-native-svg';

import { Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { ScheduleIcon } from 'src/assets';

import * as S from './styled';

export interface ScheduleContainerProps {
  isStudent?: boolean;
  children: React.ReactNode;
}

export const ScheduleContainer: React.FC<ScheduleContainerProps> = ({ isStudent, children }) => {
  const { classroom, grade, department } = useGetUser();

  return (
    <S.ScheduleScreenWrapper>
      <S.ScheduleScreenContainer>
        <S.ScheduleScreenHeader>
          <S.ScheduleScreenIconContainer>
            <WithLocalSvg width={32} height={32} asset={ScheduleIcon} />
            <Text size={20} fontFamily="bold">
              시간표
            </Text>
          </S.ScheduleScreenIconContainer>
          {isStudent && (
            <Text size={17}>
              {department} {grade}학년 {classroom}반
            </Text>
          )}
        </S.ScheduleScreenHeader>
        {children}
      </S.ScheduleScreenContainer>
    </S.ScheduleScreenWrapper>
  );
};
