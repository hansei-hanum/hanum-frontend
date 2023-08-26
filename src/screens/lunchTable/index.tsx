import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const LunchTableScreen: React.FC = () => {
  return (
    <S.LunchTableScreenContainer>
      <Text size="24" fontFamily="bold">
        Cafeteria Screen
      </Text>
    </S.LunchTableScreenContainer>
  );
};
