import React from 'react';

import {
  TimeTableList,
  WeekDay,
  AuthFailedModal,
  Spinner,
  TimeTableLayout,
  NoScrollbarScrollView,
} from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { useCheckUserType, useGetTimeTable } from 'src/hooks';

export const TimeTableScreen: React.FC = () => {
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
  } else {
    return (
      <TimeTableLayout>
        <AuthFailedModal isStudent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </TimeTableLayout>
    );
  }
};
