import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  return (
    <S.ScheduleScreenContainer>
      <Text size="24" fontFamily="bold">
        schedule Screen
      </Text>
    </S.ScheduleScreenContainer>
  );
};
