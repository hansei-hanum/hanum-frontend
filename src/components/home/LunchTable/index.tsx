import React from 'react';

import { useTheme } from '@emotion/react';

import { Spinner, Text } from 'src/components';
import { useGetMealTable } from 'src/hooks';

import { Content } from '../Content';

import * as S from './styled';

export interface LunchTableProps {
  onPress: () => void;
}

export const LunchTable: React.FC<LunchTableProps> = ({ onPress }) => {
  const date = new Date();

  const { data, isLoading } = useGetMealTable({ month: `${date.getMonth() + 1}` });

  const today = new Date();

  const filterMeal = data?.data.filter((meal) => new Date(meal.date).getDate() === today.getDate());

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
