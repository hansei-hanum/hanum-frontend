import React from 'react';
import { ScrollView } from 'react-native';

import { TimeTableList, WeekDay, AuthFailedModal, Spinner, TimeTableLayout } from 'src/components';
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <TimeTableList list={NUMBER_LIST} isNumber />
          {data?.data.map((item) => (
            <TimeTableList key={item.date} list={item.data} isToday={checkToday(item.date)} />
          ))}
        </ScrollView>
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
