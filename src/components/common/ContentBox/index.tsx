import React from 'react';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children }) => {
  return (
    <S.ContentBoxContainer
      style={{
        shadowColor: '#B0B9C2',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 40,
      }}
    >
      {children}
    </S.ContentBoxContainer>
  );
};
