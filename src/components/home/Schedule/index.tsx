import React from 'react';

import { useTheme } from '@emotion/react';

import { Spinner, Text } from 'src/components';
import { isIos } from 'src/utils';
import { useGetSchedule } from 'src/hooks';

import { Content } from '../Content';

import * as S from './styled';

export const Schedule: React.FC = () => {
  const theme = useTheme();

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
    <Content icon="📆" name="학사일정" navigateUrl="Schedule">
      <S.ScheduleContainer>
        {isLoading ? (
          <Spinner />
        ) : data?.data && data.data.length > 0 ? (
          data.data.slice(0, 4).map(({ date, data }) => (
            <S.ScheduleTextContainer key={date}>
              <Text size={fontSize} color={theme.placeholder}>
                {formatDate(date)}: {''}
              </Text>
              <Text size={fontSize}>{data.map((item) => item).join('\n')}</Text>
            </S.ScheduleTextContainer>
          ))
        ) : (
          <Text size={fontSize} color={theme.placeholder}>
            학사일정이 없습니다.
          </Text>
        )}
      </S.ScheduleContainer>
    </Content>
  );
};
