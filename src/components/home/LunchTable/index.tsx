import React from 'react';

import { useTheme } from '@emotion/react';

import { Spinner, Text } from 'src/components';
import { useGetMealData } from 'src/hooks';

import { Content } from '../Content';

import * as S from './styled';

export interface LunchTableProps {
  onPress: () => void;
}

export const LunchTable: React.FC<LunchTableProps> = ({ onPress }) => {
  const { meal, isLoading, krDate } = useGetMealData();

  const filterMeal = meal?.filter((meal) => new Date(meal.date).getDate() === krDate.getDate());

  const theme = useTheme();
  return (
    <Content icon="🍴" name="급식표" onPress={onPress}>
      <S.LunchTableTextContainer>
        <Text size={15} fontFamily="medium" color={theme.placeholder}>
          오늘의 급식
        </Text>
        {isLoading ? (
          <Spinner />
        ) : !isLoading && filterMeal && filterMeal.length > 0 ? (
          <Text size={16}>
            {filterMeal.map((item) => {
              return item.menus.join(', ') + ' ' + `(${item.kcal}kcal)`;
            })}
          </Text>
        ) : (
          <Text size={16}>불러올 급식이 없어요</Text>
        )}
      </S.LunchTableTextContainer>
    </Content>
  );
};
