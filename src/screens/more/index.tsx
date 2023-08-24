import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const MoreScreen: React.FC = () => {
  return (
    <S.MoreScreenContainer>
      <Text size="24" fontFamily="bold">
        More Screen
      </Text>
    </S.MoreScreenContainer>
  );
};
