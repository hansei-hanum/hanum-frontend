import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ScrollView } from 'react-native';

import { ActivityIndicator } from '@react-native-material/core';

import { Text, ClassList, WeekDay, AuthFailedModal } from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { ScheduleIcon } from 'src/assets';
import { useCheckUserType, useGetTimeTable, useGetUser } from 'src/hooks';
import { colors } from 'src/styles';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  const { data, isLoading } = useGetTimeTable();

  const { isStudent, modalVisible, setModalVisible } = useCheckUserType();

  const { classroom, grade, department } = useGetUser();

  const checkToday = (date: string) => {
    const today = new Date().getDay();
    const day = new Date(date).getDay();

    return today === day;
  };

  if (isStudent) {
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
            {!isLoading && (
              <S.ScheduleScreenTimeContainer>
                <ClassList list={NUMBER_LIST} isNumber />
                {data?.data.map((item) => (
                  <ClassList key={item.date} list={item.data} isToday={checkToday(item.date)} />
                ))}
              </S.ScheduleScreenTimeContainer>
            )}
          </ScrollView>
          {isLoading && (
            <ActivityIndicator
              size={26}
              color={colors.black}
              style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
            />
          )}
        </S.ScheduleScreenContainer>
      </S.ScheduleScreenWrapper>
    );
  } else {
    return (
      <AuthFailedModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isStudent={true}
      />
    );
  }
};
