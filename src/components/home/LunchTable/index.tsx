import React from 'react';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components';

import { Content } from '../Content';

import * as S from './styled';

export interface LunchTableProps {
  onPress: () => void;
}

export const LunchTable: React.FC<LunchTableProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <Content icon="🍴" name="급식표" onPress={onPress}>
      <S.LunchTableTextContainer>
        <Text size={15} fontFamily="medium" color={theme.placeholder}>
          오늘의 급식
        </Text>
        <S.LunchTableText>
          백미밥,카레소스(추가국),등심돈까스, 망고사과샐러드,포기김치,과일음료
        </S.LunchTableText>
      </S.LunchTableTextContainer>
    </Content>
  );
};
