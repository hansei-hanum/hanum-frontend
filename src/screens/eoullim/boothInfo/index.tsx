import React from 'react';

import { ScreenHeader } from 'src/components';

import * as S from './styled';

export const BoothInfoScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <ScreenHeader title="부스정보" />
    </S.EoullimTimeTableWrapper>
  );
};
