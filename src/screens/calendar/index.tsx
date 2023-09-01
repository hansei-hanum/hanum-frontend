import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { Icon, Text } from 'src/components';
import { colors } from 'src/styles';
import { CALENDAR_LIST } from 'src/constants';

import * as S from './styled';

export const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigation = useNavigation();

  const dotsDate = CALENDAR_LIST.reduce((acc, currentValue) => {
    const date = format(new Date(currentValue.date), 'yyyy-MM-dd');
    return {
      ...acc,
      [date]: {
        dots: [
          {
            key: currentValue.id,
            color: colors.primary,
            selectedDotColor: colors.primary,
          },
        ],
      },
    };
  }, {});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formatMonth = month < 10 ? `0${month}` : month;
      const formatDay = day < 10 ? `0${day}` : day;
      const todayString = `${today.getFullYear()}-${formatMonth}-${formatDay}`;
      setSelectedDate(todayString);
      console.log(todayString);
    }
  }, [isFocused]);

  return (
    <S.CalendarWrapper>
      <S.CalendarHeaderContainer>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={28} color="black" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <S.CalendarTitleContainer>
          <Icon icon="📆" />
          <Text size={20} fontFamily="bold">
            학사일정
          </Text>
        </S.CalendarTitleContainer>
      </S.CalendarHeaderContainer>
      <Calendar
        markedDates={{
          ...dotsDate,
          [selectedDate || '']: {
            selected: true,
          },
        }}
        markingType="multi-dot"
        theme={{
          selectedDayBackgroundColor: colors.primary,
          arrowColor: colors.black,
          todayTextColor: colors.primary,
          dotColor: colors.primary,
        }}
        style={{
          marginTop: 40,
          paddingBottom: 40,
          borderBottomWidth: 0.6,
          borderBottomColor: colors.placeholder,
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)} // DateData
      />
    </S.CalendarWrapper>
  );
};
