import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Text } from 'src/components';
import { GoBackIcon } from 'src/components/common';

import * as S from './styled';

export interface HanumPayHeaderProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const HanumPayHeader: React.FC<HanumPayHeaderProps> = ({ title, style }) => {
  return (
    <S.HanumPayHeader style={style}>
      <GoBackIcon />
      <Text size={17}>{title}</Text>
    </S.HanumPayHeader>
  );
};
