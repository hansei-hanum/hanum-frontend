import React from 'react';

import { EoullimTimeTable } from 'src/assets';
import { CommonHeader, Text } from 'src/components';

import * as S from './styled';

export const EoullimTimeTableScreen: React.FC = () => {
  return (
    <S.EoullimTimeTableWrapper>
      <S.EoullimTimeTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
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
