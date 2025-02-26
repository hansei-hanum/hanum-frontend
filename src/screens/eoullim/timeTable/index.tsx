import React from 'react';

import { EoullimTimeTable } from 'src/assets';
import { Header, Text } from 'src/components';
import { isIos } from 'src/utils';

import * as S from './styled';

export const EoullimTimeTableScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <Header hasGoBackIcon />
      <S.EoullimTimeTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: isIos ? 20 : 0,
          rowGap: 10,
        }}
      >
        <Text size={22} fontFamily="bold" isCenter>
          행사일정
        </Text>
        <S.EoullimTimeTableImage source={EoullimTimeTable} />
      </S.EoullimTimeTableContainer>
    </S.EoullimTimeTableWrapper>
  );
};
