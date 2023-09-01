import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const CalendarScreen: React.FC = () => {
  return (
    <S.CalendarContainer>
      <Text size={16}>Calendar Screen</Text>
    </S.CalendarContainer>
  );
};
