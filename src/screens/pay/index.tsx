import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const PayScreen: React.FC = () => {
  return (
    <S.PayScreenContainer>
      <Text size="24" fontFamily="bold">
        Pay Screen
      </Text>
    </S.PayScreenContainer>
  );
};
