import React from 'react';

import * as S from './styled';

import { BoothImg } from 'src/assets';

import { Text } from 'src/components/common';

import { View } from 'react-native';

export const BoothBox: React.FC = () => {
  return (
    <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
      <Text size={20}>클보2-1</Text>
      <S.BoothBoxContainer>
        <S.BoothImgContainer>
          <S.BoothImg source={BoothImg} />
        </S.BoothImgContainer>
        <S.DescriptionContainer>
          <Text isCenter={true} color="black" size={20} fontFamily="bold">
            연전흠
          </Text>
          <Text size={12} color="gray">
            전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.전집입니다.
          </Text>
        </S.DescriptionContainer>
      </S.BoothBoxContainer>
    </View>
  );
};
