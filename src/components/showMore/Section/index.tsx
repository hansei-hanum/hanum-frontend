import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export interface SectionProps {
  title: string;
}

export const Section: React.FC = () => {
  return (
    <S.SectionContainer>
      <Text size="20" fontFamily="bold">
        sdf
      </Text>
    </S.SectionContainer>
  );
};
