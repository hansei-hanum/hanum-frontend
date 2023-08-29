import React from 'react';
import { Platform } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import { Text } from 'src/components';
import { headerIconStyle } from 'src/constants';
import { ShowMoreIcon } from 'src/assets';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  return (
    <S.ShowMoreScreenContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 80 : 60,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
        rowGap: 20,
      }}
    >
      <S.ShowMoreHeaderScreen>
        <Text size="20" fontFamily="bold">
          더보기
        </Text>
        <WithLocalSvg
          width={headerIconStyle.width}
          height={headerIconStyle.height}
          asset={ShowMoreIcon}
        />
      </S.ShowMoreHeaderScreen>
    </S.ShowMoreScreenContainer>
  );
};
