import React from 'react';

import { DATE_LIST } from 'src/constants';
import { Text } from 'src/components';

import * as S from './styled';

export const WeekDay: React.FC = () => {
  return (
    <S.ScheduleScreenDayContainer>
      {DATE_LIST.map((date) => (
        <S.ScheduleScreenDay key={date}>
          <Text size="16" fontFamily="bold">
            {date}
          </Text>
        </S.ScheduleScreenDay>
      ))}
    </S.ScheduleScreenDayContainer>
  );
};
