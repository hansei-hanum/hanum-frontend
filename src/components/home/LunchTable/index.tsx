import React from 'react';

import { LunchTableIcon } from 'src/assets';
import { Text } from 'src/components';
import { colors } from 'src/styles';

import { Content } from '../Content';

import * as S from './styled';

export const LunchTable: React.FC = () => {
  return (
    <Content icon={LunchTableIcon} name="급식표" navigateUrl="LunchTable">
      <S.LunchTableTextContainer>
        <Text size="15" fontFamily="bold" color={colors.placeholder}>
          오늘의 급식
        </Text>
        <S.LunchTableText>
          백미밥,카레소스(추가국),등심돈까스, 망고사과샐러드,포기김치,과일음료
        </S.LunchTableText>
      </S.LunchTableTextContainer>
    </Content>
  );
};