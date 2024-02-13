import React from 'react';

import { DATE_LIST } from 'src/constants';
import { Text } from 'src/components';

import * as S from './styled';

export const WeekDay: React.FC = () => {
  return (
    <S.WeekDayList>
      {DATE_LIST.map((date) => (
        <S.WeekDayItem key={date}>
          <Text size={16}>{date}</Text>
        </S.WeekDayItem>
      ))}
    </S.WeekDayList>
  );
};
