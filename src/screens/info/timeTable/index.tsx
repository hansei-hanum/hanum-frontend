import React from 'react';

import { useTheme } from '@emotion/react';

import {
  TimeTableList,
  WeekDay,
  AuthFailedModal,
  Spinner,
  TimeTableLayout,
  NoScrollbarScrollView,
  Text,
  Icon,
} from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { useCheckUserType, useGetTimeTable } from 'src/hooks';

import * as S from './styled';

export const TimeTableScreen: React.FC = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetTimeTable();

  const { isStudent, modalVisible, setModalVisible } = useCheckUserType();

  const checkToday = (date: string) => {
    const today = new Date().getDay();
    const day = new Date(date).getDay();

    return today === day;
  };

  if (isLoading) {
    return (
      <TimeTableLayout>
        <Spinner isCenter />
      </TimeTableLayout>
    );
  } else if (isStudent && !isLoading) {
    return (
      <TimeTableLayout isStudent>
        <WeekDay />
        <NoScrollbarScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <TimeTableList list={NUMBER_LIST} isNumber />
          {data?.data.map((item) => (
            <TimeTableList key={item.date} list={item.data} isToday={checkToday(item.date)} />
          ))}
        </NoScrollbarScrollView>
      </TimeTableLayout>
    );
  } else if (isStudent && !isLoading && !data?.data) {
    return (
      <TimeTableLayout isStudent>
        <S.TimeTableNoDataContainer>
          <Icon size={70} icon="⚠️" includeBackground={false} />
          <S.TimeTableNoDataTextContainer>
            <Text size={24} fontFamily="bold">
              시간표 정보 없음
            </Text>
            <Text size={16} color={theme.default}>
              시간표 정보가 등록되지 않았어요.
            </Text>
          </S.TimeTableNoDataTextContainer>
        </S.TimeTableNoDataContainer>
      </TimeTableLayout>
    );
  } else {
    return (
      <TimeTableLayout>
        <AuthFailedModal isStudent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </TimeTableLayout>
    );
  }
};
