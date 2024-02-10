import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import moment from 'moment-timezone';

import { Button, LunchTableContainer, Modal, Spinner, Text } from 'src/components';
import { boxShadow } from 'src/constants';
import { themeAtom } from 'src/atoms';
import { useGetMealData, useGetUser } from 'src/hooks';
import { GetMealResponse } from 'src/api';

import * as S from './styled';

const WEEKDAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

export const LunchTableScreen: React.FC = () => {
  const { userData } = useGetUser();
  const { isLoading, meal } = useGetMealData();

  const krDate = moment().tz('Asia/Seoul');

  const themeValue = useRecoilValue(themeAtom);

  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const filteredMealList = meal?.filter((meal) => new Date(meal.date).getDate() >= krDate.date());

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if ((isFocused && !userData) || (isFocused && !meal && !isLoading)) {
      setModalVisible(true);
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <LunchTableContainer>
        <Spinner isCenter />
      </LunchTableContainer>
    );
  } else if (!isLoading && meal && meal?.length > 0 && userData) {
    return (
      <LunchTableContainer>
        <S.LunchTableContainer
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 40,
            paddingHorizontal: 20,
            rowGap: 25,
          }}
        >
          <S.LunchTableBoxContainer>
            {filteredMealList
              ?.reduce<GetMealResponse[][]>((acc, currentValue, index) => {
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
                        {item.menus.map((item) => (
                          <View key={item}>
                            <Text size={15} color={todayLunchText}>
                              {item}
                            </Text>
                          </View>
                        ))}
                        <Text size={15} color={todayLunchText}>
                          ({item.kcal} kcal)
                        </Text>
                      </S.LunchBoxContainer>
                    );
                  })}
                </S.LunchBoxWrapper>
              ))}
          </S.LunchTableBoxContainer>
        </S.LunchTableContainer>
      </LunchTableContainer>
    );
  } else {
    return (
      <LunchTableContainer>
        <Modal
          modalVisible={modalVisible}
          title="급식 정보 불러오기 실패"
          text={'급식 정보를 불러오는데 실패했습니다.\n' + '다시 시도해주세요.'}
          button={
            <Button
              onPress={() => {
                navigation.goBack(), setModalVisible(false);
              }}
            >
              확인
            </Button>
          }
        />
      </LunchTableContainer>
    );
  }
};
