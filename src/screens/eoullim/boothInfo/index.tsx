import React from 'react';

import * as S from './styled';

import { ScreenHeader } from 'src/components';

import { BoothBox } from 'src/components';

export const BoothInfoScreen: React.FC = () => {
  return (
    <S.BoothInfoScreenInfoWrapper>
      <ScreenHeader title="부스 정보" />
      <S.BoothInfoContainer>
        <BoothBox />
      </S.BoothInfoContainer>
    </S.BoothInfoScreenInfoWrapper>
  );
};
