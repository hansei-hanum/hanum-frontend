import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import messaging from '@react-native-firebase/messaging';
import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Button, Header, Modal, Spinner, Text } from 'src/components';
import { boxShadow } from 'src/constants';
import { MealIcon } from 'src/assets';
import { themeAtom } from 'src/atoms';
import { useGetMealData } from 'src/hooks';
import { GetMealResponse } from 'src/api';

import * as S from './styled';

const WEEKDAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

export const LunchTableScreen: React.FC = () => {
  const { isLoading, meal, krDate } = useGetMealData();

  const themeValue = useRecoilValue(themeAtom);

  const theme = useTheme();

  const scrollViewRef = useRef<ScrollView>(null);

  const [notifyClick, setNotifyClick] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
    if (!notifyClick) {
      messaging().subscribeToTopic('meal');
    } else {
      messaging().unsubscribeFromTopic('meal');
    }
  };

  const filteredMealList = meal?.filter(
    (meal) => new Date(meal.date).getDate() >= krDate.getDate(),
  );

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !isLoading && !meal) {
      setModalVisible(true);
    }
  }, [isFocused]);

  return (
    <S.LunchTableWrapper>
      <Header>
        <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center' }}>
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
      {isLoading ? (
        <Spinner isCenter />
      ) : !isLoading && meal ? (
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
      ) : (
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
        // <Text size={20} fontFamily="bold">
        //   급식 정보가 없습니다.
        // </Text>
      )}
    </S.LunchTableWrapper>
  );
};
