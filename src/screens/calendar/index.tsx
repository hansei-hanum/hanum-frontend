import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import { ActivityIndicator } from '@react-native-material/core';

import { ContentBox, GoBackIcon, Icon, Text } from 'src/components';
import { colors } from 'src/styles';
import { useGetMonthSchedule } from 'src/hooks';

import * as S from './styled';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'ko';

export const CalendarScreen: React.FC = () => {
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthSchedule = useGetMonthSchedule({ month: month });
  const mothScheduleData = monthSchedule.data;

  const dotsDate = mothScheduleData
    ? mothScheduleData.data.reduce((acc, currentValue) => {
        const date = format(new Date(currentValue.date), 'yyyy-MM-dd');
        return {
          ...acc,
          [date]: {
            dots: [
              {
                key: currentValue.date,
                color: colors.primary,
                selectedDotColor: colors.primary,
              },
            ],
          },
        };
      }, {})
    : null;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && mothScheduleData) {
      const today = new Date();
      const formatMonth = (n: number) => (n < 10 ? `0${n}` : n);
      const formatDay = (n: number) => (n < 10 ? `0${n}` : n);
      const todayString = `${today.getFullYear()}-${formatMonth(today.getMonth() + 1)}-${formatDay(
        today.getDate(),
      )}`;
      setSelectedDate(todayString);
    }
  }, [isFocused]);

  useEffect(() => {
    monthSchedule.refetch();
  }, [month]);

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
      {monthSchedule.isLoading ? (
        <ActivityIndicator
          size={26}
          color={colors.black}
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      ) : (
        <>
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
            onMonthChange={({ month }) => {
              setMonth(month.toString());
            }}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
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
            {mothScheduleData?.data
              .find(({ date }) => format(new Date(date), 'yyyy-MM-dd') === selectedDate)
              ?.data.map((item) => (
                <ContentBox>
                  <Text size={16} fontFamily="medium" key={item}>
                    {item}
                  </Text>
                </ContentBox>
              ))}
          </S.CalendarScheduleContainer>
        </>
      )}
    </S.CalendarWrapper>
  );
};
