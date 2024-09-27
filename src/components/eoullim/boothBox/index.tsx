import React from 'react';

import * as S from './styled';

import { Text } from 'src/components/common';

import { BoothInfoData } from 'src/constants/eoulim/boothData';

export const BoothBox: React.FC = () => {
  return (
    <S.BoothBoxContainer>
      {BoothInfoData.map((item, index) => {
        return (
          <S.BoothBox key={index}>
            <S.BoothImg source={item.img} />
            <S.BoothDescription>
              <Text size={15} color="lightgray">
                {item.id}
              </Text>
              <Text size={15} color="lightgray">
                {item.boothName}
              </Text>
              <Text size={15} color="lightgray">
                {item.hashTag}
              </Text>
            </S.BoothDescription>
          </S.BoothBox>
        );
      })}
    </S.BoothBoxContainer>
  );
};
