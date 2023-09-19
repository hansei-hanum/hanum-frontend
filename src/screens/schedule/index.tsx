import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ScrollView } from 'react-native';

import { Text, ClassList, WeekDay } from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { ScheduleIcon } from 'src/assets';
import { useGetTimeTable, useGetUser } from 'src/hooks';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  const { data } = useGetTimeTable();
  const { classroom, grade, department } = useGetUser();

  const checkToday = (date: string) => {
    const today = new Date().getDay();
    const day = new Date(date).getDay();

    return today === day;
  };

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
          <Text size={17}>
            {department} {grade}학년 {classroom}반
          </Text>
        </S.ScheduleScreenHeader>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <WeekDay />
          <S.ScheduleScreenTimeContainer>
            <ClassList list={NUMBER_LIST} isNumber />
            {data?.data.map((item) => (
              <ClassList key={item.date} list={item.data} isToday={checkToday(item.date)} />
            ))}
          </S.ScheduleScreenTimeContainer>
        </ScrollView>
      </S.ScheduleScreenContainer>
    </S.ScheduleScreenWrapper>
  );
};
