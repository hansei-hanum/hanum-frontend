import React, { useEffect, useRef, useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ScrollView, Switch, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Text } from 'src/components';
import { LunchTableIcon } from 'src/assets';
import { colors } from 'src/styles';
import { boxShadow } from 'src/constants';
import { MEAL_LIST, MealItem } from 'src/constants/meal';
import { WEEKDAY_LIST } from 'src/constants/weekDay';

import * as S from './styled';

export const LunchTableScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
  };

  const ITEM_HEIGHT = 230;
  const isFocused = useIsFocused();

  useEffect(() => {
    const todayLunch = MEAL_LIST.find((item) => {
      const date = new Date(item.date);
      const nowDate = new Date();
      return date.getDate() === nowDate.getDate();
    });
    if (todayLunch) {
      setTimeout(() => {
        const yOffset = MEAL_LIST.indexOf(todayLunch) * ITEM_HEIGHT;
        scrollViewRef?.current?.scrollTo({ y: yOffset, animated: true });
      }, 0);
    }
  }, [isFocused]);

  return (
    <S.LunchTableWrapper>
      <S.LunchTableContainer
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 140,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 25,
        }}
      >
        <S.LunchTableAlertContainer>
          <Text size="18" fontFamily="medium">
            매일 아침 알림 받기
          </Text>
          <Switch
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={notifyClick ? colors.white : colors.white}
            ios_backgroundColor={colors.lightGray}
            onValueChange={toggleNotifyClick}
            value={notifyClick}
          />
        </S.LunchTableAlertContainer>
        <S.LunchTableBoxContainer>
          {MEAL_LIST.reduce<MealItem[][]>((acc, currentValue, index) => {
            if (index % 2 === 0) acc.push([currentValue]);
            else acc[acc.length - 1].push(currentValue);
            return acc;
          }, []).map((items, index) => (
            <S.LunchBoxWrapper key={index}>
              {items.map((item) => {
                const date = new Date(item.date);
                return (
                  <S.LunchBoxContainer
                    key={item.date}
                    style={[boxShadow, { backgroundColor: colors.white }]}
                  >
                    <Text size="20" fontFamily="bold">
                      {`${date.getMonth() + 1}/${date.getDate()} (${WEEKDAY_LIST[date.getDay()]})`}
                    </Text>
                    {item.menus.map(({ name, allergys }) => (
                      <View key={name}>
                        <Text fontFamily="medium" size="16">
                          {name}
                        </Text>
                        {allergys.length > 0 && (
                          <Text fontFamily="medium" size="12" color={colors.placeholder}>
                            {allergys.join(', ')}
                          </Text>
                        )}
                      </View>
                    ))}
                  </S.LunchBoxContainer>
                );
              })}
            </S.LunchBoxWrapper>
          ))}
        </S.LunchTableBoxContainer>
      </S.LunchTableContainer>
      <S.LunchTableHeader>
        <WithLocalSvg width={40} height={40} asset={LunchTableIcon} />
        <Text size="22" fontFamily="bold">
          급식표
        </Text>
      </S.LunchTableHeader>
    </S.LunchTableWrapper>
  );
};
