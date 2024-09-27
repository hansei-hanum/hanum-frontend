import React from 'react';

import * as S from './styled';

import { Text } from 'src/components/common';
import { themeAtom } from 'src/atoms';
import { BoothInfoData } from 'src/constants/eoulim/boothData';

import { useRecoilValue } from 'recoil';

export const BoothBox: React.FC = () => {
  const themeValue = useRecoilValue(themeAtom);

  return (
    <S.BoothBoxContainer>
      {BoothInfoData.map((item, index) => {
        return (
          <S.BoothBox
            style={{ backgroundColor: themeValue === 'dark' ? '#353434' : '#F8F6F6' }}
            key={index}
          >
            <S.BoothImg source={item.img} />
            <S.BoothDescription>
              <Text size={15} color={themeValue === 'dark' ? 'lightgray' : '#514F4F'}>
                {item.id}
              </Text>
              <Text size={15} color={themeValue === 'dark' ? 'lightgray' : '#514F4F'}>
                {item.boothName}
              </Text>
              <Text size={15} color={themeValue === 'dark' ? 'lightgray' : '#514F4F'}>
                {item.hashTag}
              </Text>
            </S.BoothDescription>
          </S.BoothBox>
        );
      })}
    </S.BoothBoxContainer>
  );
};
