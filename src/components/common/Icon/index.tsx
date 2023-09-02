import React from 'react';

import * as S from './styled';

export interface IconProps {
  icon: string;
}
export const Icon: React.FC<IconProps> = ({ icon }) => {
  return (
    <S.IconWrapper>
      <S.Icon>{icon}</S.Icon>
    </S.IconWrapper>
  );
};
