import React from 'react';

import { BoothMap } from 'src/assets';
import { Header, ScreenHeader, Text } from 'src/components';
import { isIos } from 'src/utils';

import * as S from './styled';

export const BoothInfoScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <ScreenHeader title="부스맵" />
      <S.EoullimTimeTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: isIos ? 20 : 0,
          rowGap: 10,
        }}
      >
        <S.EoullimTimeTableImage source={BoothMap} />
      </S.EoullimTimeTableContainer>
    </S.EoullimTimeTableWrapper>
  );
};
