import React from 'react';
import { ScrollView } from 'react-native';

import { ClassList, WeekDay, AuthFailedModal, Spinner, ScheduleContainer } from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { useCheckUserType, useGetTimeTable } from 'src/hooks';

export const ScheduleScreen: React.FC = () => {
  const { data, isLoading } = useGetTimeTable();

  const { isStudent, modalVisible, setModalVisible } = useCheckUserType();

  const checkToday = (date: string) => {
    const today = new Date().getDay();
    const day = new Date(date).getDay();

    return today === day;
  };

  if (isLoading) {
    return (
      <ScheduleContainer>
        <Spinner isCenter />
      </ScheduleContainer>
    );
  } else if (isStudent && !isLoading) {
    return (
      <ScheduleContainer isStudent>
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
          <ClassList list={NUMBER_LIST} isNumber />
          {data?.data.map((item) => (
            <ClassList key={item.date} list={item.data} isToday={checkToday(item.date)} />
          ))}
        </ScrollView>
      </ScheduleContainer>
    );
  } else {
    return (
      <ScheduleContainer>
        <AuthFailedModal isStudent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScheduleContainer>
    );
  }
};
