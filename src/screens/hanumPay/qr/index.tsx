import React from 'react';

import { HanumPayHeader } from 'src/components';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRContainer>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRContainer>
    </S.HanumPayQRWrapper>
  );
};
