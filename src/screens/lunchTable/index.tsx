import React, { useEffect, useRef, useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { Platform, ScrollView, Switch, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Text } from 'src/components';
import { LunchTableIcon } from 'src/assets';
import { colors } from 'src/styles';
import { boxShadow, WEEKDAY_LIST, MealItem, MEAL_LIST, headerIconStyle } from 'src/constants';

import * as S from './styled';

export const LunchTableScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [notifyClick, setNotifyClick] = useState<boolean>(false);
  const [todayLunch, setTodayLunch] = useState<MealItem | null>(null);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
  };

  const ITEM_HEIGHT = Platform.OS === 'ios' ? 160 : 150;
  const isFocused = useIsFocused();

  useEffect(() => {
    const todayLunch = MEAL_LIST.find((item) => {
      const date = new Date(item.date);
      const nowDate = new Date();
      setTodayLunch(item);
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
          paddingTop: Platform.OS === 'ios' ? 190 : 150,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 25,
        }}
      >
        <S.LunchTableBoxContainer>
          {MEAL_LIST.reduce<MealItem[][]>((acc, currentValue, index) => {
            if (index % 2 === 0) acc.push([currentValue]);
            else acc[acc.length - 1].push(currentValue);
            return acc;
          }, []).map((items, index) => (
            <S.LunchBoxWrapper key={index}>
              {items.map((item) => {
                const date = new Date(item.date);
                const checkTodayLunch = todayLunch?.date === item.date;
                const todayLunchText = checkTodayLunch ? colors.white : colors.black;
                return (
                  <S.LunchBoxContainer
                    key={item.date}
                    style={[
                      boxShadow,
                      {
                        backgroundColor: checkTodayLunch ? colors.primary : colors.white,
                      },
                    ]}
                  >
                    <Text size="18" fontFamily="bold" color={todayLunchText}>
                      {`${date.getMonth() + 1}/${date.getDate()} (${WEEKDAY_LIST[date.getDay()]})`}
                    </Text>
                    {item.menus.map(({ name, allergys }) => (
                      <View key={name}>
                        <Text
                          fontFamily="medium"
                          size={Platform.OS === 'ios' ? '15' : '14'}
                          color={todayLunchText}
                        >
                          {name}
                        </Text>
                        {allergys.length > 0 && (
                          <Text
                            fontFamily="medium"
                            size="10"
                            color={checkTodayLunch ? colors.secondary : colors.placeholder}
                          >
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
        <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center' }}>
          <WithLocalSvg
            width={headerIconStyle.width}
            height={headerIconStyle.height}
            asset={LunchTableIcon}
          />
          <Text size="20" fontFamily="bold">
            급식표
          </Text>
        </View>
        <S.LunchTableAlertContainer>
          <Text size="17" fontFamily="medium">
            매일 아침 알림 받기
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={notifyClick ? colors.white : colors.white}
            ios_backgroundColor={colors.lightGray}
            onValueChange={toggleNotifyClick}
            value={notifyClick}
          />
        </S.LunchTableAlertContainer>
      </S.LunchTableHeader>
    </S.LunchTableWrapper>
  );
};
