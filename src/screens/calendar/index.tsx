import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';

import { ContentBox, GoBackHeader, Icon, Text, Spinner, Header } from 'src/components';
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
  const theme = useTheme();

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
                color: theme.primary,
                selectedDotColor: theme.primary,
              },
            ],
          },
        };
      }, {})
    : null;

  const filterDate = mothScheduleData?.data.find(
    ({ date }) => format(new Date(date), 'yyyy-MM-dd') === selectedDate,
  )?.data;

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
      <Header>
        <GoBackHeader size={28} />
        <S.CalendarTitleContainer>
          <Icon icon="📆" includeBackground={false} />
          <Text size={20} fontFamily="bold">
            학사일정
          </Text>
        </S.CalendarTitleContainer>
      </Header>
      {monthSchedule.isLoading ? (
        <Spinner isCenter />
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
              selectedDayBackgroundColor: theme.primary,
              arrowColor: theme.default,
              todayTextColor: theme.primary,
              dotColor: theme.primary,
              selectedDotColor: theme.white,
              calendarBackground: theme.modalBg,
              dayTextColor: theme.default,
              monthTextColor: theme.default,
            }}
            style={{
              marginTop: 30,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 40,
              borderBottomWidth: 0.4,
              borderBottomColor: theme.placeholder,
              backgroundColor: theme.modalBg,
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
            {filterDate ? (
              filterDate.map((item) => (
                <ContentBox key={item}>
                  <Text size={16} fontFamily="medium" key={item}>
                    {item}
                  </Text>
                </ContentBox>
              ))
            ) : (
              <Text size={16} fontFamily="medium">
                일정이 없습니다.
              </Text>
            )}
          </S.CalendarScheduleContainer>
        </>
      )}
    </S.CalendarWrapper>
  );
};
