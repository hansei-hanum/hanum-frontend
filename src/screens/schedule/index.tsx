import React, { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { format } from 'date-fns';
import { Theme, useTheme } from '@emotion/react';

import { ContentBox, Text, Spinner, Header } from 'src/components';
import { useGetMonthSchedule } from 'src/hooks';
import { setKoreanLocale } from 'src/utils';
import { CalendarIcon } from 'src/assets';

import * as S from './styled';

const CalendarStyle = (theme: Theme) => ({
  marginTop: 30,
  paddingHorizontal: 20,
  paddingBottom: 40,
  borderBottomWidth: 0.4,
  borderBottomColor: theme.placeholder,
  backgroundColor: theme.modalBg,
});

const CalendarThemeOptions = (theme: Theme) => ({
  selectedDayBackgroundColor: theme.primary,
  arrowColor: theme.default,
  todayTextColor: theme.primary,
  dotColor: theme.primary,
  selectedDotColor: theme.white,
  calendarBackground: theme.modalBg,
  dayTextColor: theme.default,
  monthTextColor: theme.default,
});

export const CalendarScreen: React.FC = () => {
  setKoreanLocale();

  const theme = useTheme();
  const isFocused = useIsFocused();

  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthSchedule = useGetMonthSchedule({ month: month });
  const monthScheduleData = monthSchedule.data;

  const setScheduleDots = useCallback(
    (scheduleData: typeof monthScheduleData) => {
      if (!scheduleData?.data) return null;

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
    },
    [monthScheduleData],
  );

  const getDayDetails = useCallback(
    (scheduleData: typeof monthScheduleData) => {
      if (!scheduleData?.data) return null;

      return scheduleData.data.find(
        ({ date }) => format(new Date(date), 'yyyy-MM-dd') === selectedDate,
      )?.data;
    },
    [selectedDate],
  );

  const dayDetails = getDayDetails(monthScheduleData);

  useEffect(() => {
    if (isFocused && monthScheduleData) {
      setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    }
  }, [isFocused]);

  useEffect(() => {
    monthSchedule.refetch();
  }, [month]);

  return (
    <S.ScheduleContainer>
      <Header hasGoBackIcon hasIconContainer={{ icon: CalendarIcon, text: '학사일정' }} />
      {monthSchedule.isLoading || !monthSchedule.data ? (
        <Spinner isCenter />
      ) : (
        <>
          <Calendar
            locale={'ko'}
            markedDates={{
              ...(setScheduleDots(monthScheduleData) || {}),
              [selectedDate || '']: {
                selected: true,
              },
            }}
            markingType="multi-dot"
            theme={CalendarThemeOptions(theme)}
            style={CalendarStyle(theme)}
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
            bounces={false}
            contentContainerStyle={{
              padding: 20,
              rowGap: 20,
            }}
          >
            {dayDetails ? (
              dayDetails?.map((item) => (
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
    </S.ScheduleContainer>
  );
};
