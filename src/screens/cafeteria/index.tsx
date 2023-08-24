import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const CafeteriaScreen: React.FC = () => {
  return (
    <S.CafeteriaScreenContainer>
      <Text size="24" fontFamily="bold">
        Cafeteria Screen
      </Text>
    </S.CafeteriaScreenContainer>
  );
};
