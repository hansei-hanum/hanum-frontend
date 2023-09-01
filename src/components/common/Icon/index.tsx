import React from 'react';

import { Text } from '../Text';

import * as S from './styled';

export interface IconProps {
  icon: string;
}
export const Icon: React.FC<IconProps> = ({ icon }) => {
  return (
    <S.IconWrapper>
      <Text size={30} fontFamily="tossIcon">
        {icon}
      </Text>
    </S.IconWrapper>
  );
};
