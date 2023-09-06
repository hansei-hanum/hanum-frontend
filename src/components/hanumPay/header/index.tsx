import React from 'react';

import { Text } from 'src/components';
import { GoBackIcon } from 'src/components/common';

import * as S from './styled';

export interface HanumPayHeaderProps {
  title: string;
}

export const HanumPayHeader: React.FC<HanumPayHeaderProps> = ({ title }) => {
  return (
    <S.HanumPayHeader>
      <GoBackIcon style={{ position: 'absolute', left: 0, top: 0 }} />
      <Text size={17}>{title}</Text>
    </S.HanumPayHeader>
  );
};
