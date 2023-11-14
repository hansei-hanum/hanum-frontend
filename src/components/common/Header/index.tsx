import React from 'react';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
  isRow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ children, isRow }) => {
  return (
    <S.HeaderContainer
      style={{
        flexDirection: isRow ? 'row' : 'column',
        alignItems: isRow ? 'center' : 'flex-start',
        justifyContent: isRow ? 'space-between' : 'flex-start',
      }}
    >
      {children}
    </S.HeaderContainer>
  );
};
