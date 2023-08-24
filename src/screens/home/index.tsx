import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  return (
    <S.HomeScreenContainer>
      <Text size="24" fontFamily="bold">
        HomeScreen
      </Text>
    </S.HomeScreenContainer>
  );
};
