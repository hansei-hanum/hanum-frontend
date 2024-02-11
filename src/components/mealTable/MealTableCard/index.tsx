import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { GetLunchMenusResponse } from 'src/api';
import { themeAtom } from 'src/atoms';
import { boxShadow } from 'src/constants';
import { Text } from 'src/components/common';

import * as S from './styled';

export interface MealTableCardProps extends GetLunchMenusResponse {}

const WEEKDAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

export const MealTableCard: React.FC<MealTableCardProps> = ({ date, menus, kcal }) => {
  const theme = useTheme();
  const themeValue = useRecoilValue(themeAtom);

  const mealDate = new Date(date);
  const nowDate = new Date();
  const checkTodayLunch = mealDate.getDate() === nowDate.getDate();
  const todayLunchText = checkTodayLunch ? theme.white : theme.default;

  return (
    <S.MealTableCardContainer
      key={date}
      style={[
        themeValue === 'light' && boxShadow,
        {
          backgroundColor: checkTodayLunch ? theme.primary : theme.modalBg,
        },
      ]}
    >
      <Text size={18} fontFamily="bold" color={todayLunchText}>
        {`${mealDate.getMonth() + 1}/${mealDate.getDate()} (${WEEKDAY_LIST[mealDate.getDay()]})`}
      </Text>
      {menus.map((item) => (
        <Text size={15} color={todayLunchText} key={item}>
          {item}
        </Text>
      ))}
      <Text size={15} color={todayLunchText}>
        ({kcal} kcal)
      </Text>
    </S.MealTableCardContainer>
  );
};
