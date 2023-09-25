import React from 'react';

import * as S from './styled';

export interface IconProps {
  icon: string;
  includeBackground?: boolean;
  backgroundColor?: string;
  size?: number;
}
export const Icon: React.FC<IconProps> = ({
  icon,
  backgroundColor,
  includeBackground = true,
  size,
}) => {
  return includeBackground ? (
    <S.IconWrapper backgroundColor={backgroundColor}>
      <S.Icon>{icon}</S.Icon>
    </S.IconWrapper>
  ) : (
    <S.Icon style={{ fontSize: size ? size : 30 }}>{icon}</S.Icon>
  );
};
