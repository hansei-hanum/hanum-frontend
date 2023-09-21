import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Text } from 'src/components';
import { colors } from 'src/styles';
import { isIos } from 'src/utils';
import { CalendarIcon } from 'src/assets';
import { useGetSchedule } from 'src/hooks';

import { Content } from '../Content';

import * as S from './styled';

export const Calendar: React.FC = () => {
  const { data, isLoading } = useGetSchedule();
  const fontSize = isIos ? 15 : 14;

  const formatDate = (scheduleDate: string) => {
    const date = new Date(scheduleDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${formattedMonth}월 ${formattedDay}일`;
  };

  return (
    <Content icon="📆" name="학사일정" navigateUrl="Calendar">
      <S.CalendarContainer>
        {isLoading ? (
          <ActivityIndicator size={26} />
        ) : (
          data?.data.slice(0, 4).map(({ date, data }) => (
            <S.CalendarTextContainer key={date}>
              <Text size={fontSize} fontFamily="medium" color={colors.placeholder}>
                {formatDate(date)}: {''}
              </Text>
              <Text size={fontSize} fontFamily="medium" color={colors.black}>
                {data.map((item) => item).join('\n ')}
              </Text>
            </S.CalendarTextContainer>
          ))
        )}
      </S.CalendarContainer>
    </Content>
  );
};
