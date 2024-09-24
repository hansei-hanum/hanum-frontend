import React from 'react';

import { EoullimTimeTable } from 'src/assets';
import { ScreenHeader } from 'src/components';
import { isIos } from 'src/utils';

import * as S from './styled';

export const EoullimTimeTableScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <ScreenHeader title="행사일정" />
      <S.EoullimTimeTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: isIos ? 20 : 0,
          rowGap: 10,
        }}
      >
        <S.EoullimTimeTableImage source={EoullimTimeTable} />
      </S.EoullimTimeTableContainer>
    </S.EoullimTimeTableWrapper>
  );
};
