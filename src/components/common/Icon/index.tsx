import React from 'react';

import * as S from './styled';
import { Text } from 'react-native-svg';

export interface IconProps {
  icon: string;
  includeBackground?: boolean;
  backgroundColor?: string;
}
export const Icon: React.FC<IconProps> = ({ icon, backgroundColor, includeBackground = true }) => {
  return includeBackground ? (
    <S.IconWrapper backgroundColor={backgroundColor}>
      <S.Icon>{icon}</S.Icon>
    </S.IconWrapper>
  ) : (
    <S.Icon>{icon}</S.Icon>
  );
};
