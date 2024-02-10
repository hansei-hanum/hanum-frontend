import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { format } from 'date-fns';
import { useTheme } from '@emotion/react';

import { ContentBox, GoBackIcon, Icon, Text, Spinner, Header } from 'src/components';
import { useGetMonthSchedule } from 'src/hooks';
import { setKoreanLocale } from 'src/utils';

import * as S from './styled';

export const CalendarScreen: React.FC = () => {
  setKoreanLocale();

  const theme = useTheme();
  const isFocused = useIsFocused();

  const CalendarStyle = {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomWidth: 0.4,
    borderBottomColor: theme.placeholder,
    backgroundColor: theme.modalBg,
  };

  const CalendarThemeOptions = {
    selectedDayBackgroundColor: theme.primary,
    arrowColor: theme.default,
    todayTextColor: theme.primary,
    dotColor: theme.primary,
    selectedDotColor: theme.white,
    calendarBackground: theme.modalBg,
    dayTextColor: theme.default,
    monthTextColor: theme.default,
  };

  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthSchedule = useGetMonthSchedule({ month: month });
  const mothScheduleData = monthSchedule.data;

  const getDotsDate = (scheduleData: typeof mothScheduleData) => {
    if (!scheduleData || !scheduleData.data) return null;

    return scheduleData.data.reduce((acc, currentValue) => {
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
    }, {});
  };

  const getFilterDate = (scheduleData: typeof mothScheduleData) => {
    if (!scheduleData?.data) return null;

    return scheduleData.data.find(
      ({ date }) => format(new Date(date), 'yyyy-MM-dd') === selectedDate,
    )?.data;
  };

  const filterDate = getFilterDate(mothScheduleData);

  useEffect(() => {
    if (isFocused && mothScheduleData) {
      const today = new Date();
      const formatDate = (n: number) => (n < 10 ? `0${n}` : n);

      const todayString = `${today.getFullYear()}-${formatDate(today.getMonth() + 1)}-${formatDate(
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
        <GoBackIcon />
        <S.CalendarTitleContainer>
          <Icon icon="📆" includeBackground={false} />
          <Text size={20} fontFamily="bold">
            학사일정
          </Text>
        </S.CalendarTitleContainer>
      </Header>
      {monthSchedule.isLoading || !monthSchedule.data ? (
        <Spinner isCenter />
      ) : (
        <>
          <Calendar
            locale={'ko'}
            markedDates={{
              ...(getDotsDate(mothScheduleData) || {}),
              [selectedDate || '']: {
                selected: true,
              },
            }}
            markingType="multi-dot"
            theme={CalendarThemeOptions}
            style={CalendarStyle}
            onMonthChange={({ month }) => {
              setMonth(month.toString());
            }}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
              rowGap: 20,
            }}
          >
            {filterDate ? (
              filterDate?.map((item) => (
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
          </ScrollView>
        </>
      )}
    </S.CalendarWrapper>
  );
};
