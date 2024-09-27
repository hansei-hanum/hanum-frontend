import React from 'react';

import { ScreenHeader, BoothBox } from 'src/components';

import * as S from './styled';

export const BoothInfoScreen: React.FC = () => {
  return (
    <S.EoullimBoothInfoWrapper>
      <ScreenHeader title="부스정보" />
      <S.ScrollView>
        <BoothBox />
      </S.ScrollView>
    </S.EoullimBoothInfoWrapper>
  );
};
