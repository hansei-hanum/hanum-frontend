import React from 'react';

import { EoullimTimeTable } from 'src/assets';
import { EoullimHeader } from 'src/components';

import * as S from './styled';

export const EoullimTimeTableScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <EoullimHeader />
      <S.EoullimTimeTableContainer source={EoullimTimeTable} />
    </S.EoullimTimeTableWrapper>
  );
};
