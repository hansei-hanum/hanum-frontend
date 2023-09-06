import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';

import { ContentBox, GoBackIcon, Icon, Text } from 'src/components';
import { colors } from 'src/styles';
import { CALENDAR_LIST } from 'src/constants';

import * as S from './styled';

LocaleConfig.defaultLocale = 'ko';

export const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
      const formatMonth = (n: number) => (n < 10 ? `0${n}` : n);
      const formatDay = (n: number) => (n < 10 ? `0${n}` : n);
      const todayString = `${today.getFullYear()}-${formatMonth(today.getMonth() + 1)}-${formatDay(
        today.getDate(),
      )}`;
      setSelectedDate(todayString);
    }
  }, [isFocused]);

  return (
    <S.CalendarWrapper>
      <S.CalendarHeaderContainer>
        <GoBackIcon size={28} style={{ marginBottom: 10 }} />
        <S.CalendarTitleContainer>
          <Icon icon="📆" />
          <Text size={20} fontFamily="bold">
            학사일정
          </Text>
        </S.CalendarTitleContainer>
      </S.CalendarHeaderContainer>
      <Calendar
        locale={'ko'}
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
          selectedDotColor: colors.white,
        }}
        style={{
          marginTop: 30,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 40,
          borderBottomWidth: 0.4,
          borderBottomColor: colors.placeholder,
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      <S.CalendarScheduleContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        {CALENDAR_LIST.find((item) => item.date === selectedDate)?.contents.map((item) => (
          <ContentBox>
            <Text size={16} fontFamily="medium" key={item}>
              {item}
            </Text>
          </ContentBox>
        ))}
      </S.CalendarScheduleContainer>
    </S.CalendarWrapper>
  );
};
