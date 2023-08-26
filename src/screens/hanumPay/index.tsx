import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  return (
    <S.HanumPayScreenContainer>
      <Text size="24" fontFamily="bold">
        HanumPay Screen
      </Text>
    </S.HanumPayScreenContainer>
  );
};
