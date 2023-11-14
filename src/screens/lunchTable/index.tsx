import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { GoBackIcon, Header, Text } from 'src/components';
import { boxShadow, MealItem, MEAL_LIST } from 'src/constants';
import { MealIcon } from 'src/assets';
import { themeAtom } from 'src/atoms';

import * as S from './styled';

const WEEKDAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

export const LunchTableScreen: React.FC = () => {
  const themeValue = useRecoilValue(themeAtom);

  const theme = useTheme();

  const scrollViewRef = useRef<ScrollView>(null);

  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
    if (notifyClick) {
      messaging().subscribeToTopic('meal');
    } else {
      messaging().unsubscribeFromTopic('meal');
    }
  };

  const isFocused = useIsFocused();

  const today = new Date();

  const filteredMealList = MEAL_LIST.filter(
    (meal) => new Date(meal.date).getDate() >= today.getDate(),
  );

  useEffect(() => {}, [isFocused]);

  return (
    <S.LunchTableWrapper>
      <Header>
        <GoBackIcon />
        <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center', marginTop: 20 }}>
          <WithLocalSvg width={34} height={34} asset={MealIcon} />
          <Text size={20} fontFamily="bold">
            급식표
          </Text>
        </View>
        <S.LunchTableAlertContainer>
          <Text size={17} fontFamily="medium">
            매일 아침 알림 받기
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            trackColor={{ false: theme.lightGray, true: theme.primary }}
            thumbColor={notifyClick ? theme.white : theme.white}
            ios_backgroundColor={theme.lightGray}
            onValueChange={toggleNotifyClick}
            value={notifyClick}
          />
        </S.LunchTableAlertContainer>
      </Header>
      <S.LunchTableContainer
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 25,
        }}
      >
        <S.LunchTableBoxContainer>
          {filteredMealList
            .reduce<MealItem[][]>((acc, currentValue, index) => {
              if (index % 2 === 0) acc.push([currentValue]);
              else acc[acc.length - 1].push(currentValue);
              return acc;
            }, [])
            .map((items, index) => (
              <S.LunchBoxWrapper key={index}>
                {items.map((item) => {
                  const date = new Date(item.date);
                  const nowDate = new Date();
                  const checkTodayLunch = date.getDate() === nowDate.getDate();
                  const todayLunchText = checkTodayLunch ? theme.white : theme.default;
                  return (
                    <S.LunchBoxContainer
                      key={item.date}
                      style={[
                        themeValue === 'light' && boxShadow,
                        {
                          backgroundColor: checkTodayLunch ? theme.primary : theme.modalBg,
                        },
                      ]}
                    >
                      <Text size={18} fontFamily="bold" color={todayLunchText}>
                        {`${date.getMonth() + 1}/${date.getDate()} (${
                          WEEKDAY_LIST[date.getDay()]
                        })`}
                      </Text>
                      {item.menus.map(({ name }) => (
                        <View key={name}>
                          <Text size={15} color={todayLunchText}>
                            {name}
                          </Text>
                        </View>
                      ))}
                    </S.LunchBoxContainer>
                  );
                })}
              </S.LunchBoxWrapper>
            ))}
        </S.LunchTableBoxContainer>
      </S.LunchTableContainer>
    </S.LunchTableWrapper>
  );
};
