import React from 'react';

import { EoullimTimeTable } from 'src/assets';
import { CommonHeader, Text } from 'src/components';

import * as S from './styled';
import { isIos } from 'src/utils';

export const EoullimTimeTableScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <S.EoullimTimeTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: isIos ? 20 : 0,
          rowGap: 10,
        }}
      >
        <CommonHeader />
        <Text size={22} fontFamily="bold" isCenter>
          행사일정
        </Text>
        <S.EoullimTimeTableImage source={EoullimTimeTable} />
      </S.EoullimTimeTableContainer>
    </S.EoullimTimeTableWrapper>
  );
};
