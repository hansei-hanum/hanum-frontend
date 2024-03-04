import React, { useEffect } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Button, MealTableCard, MealTableLayout, Modal, Spinner } from 'src/components';
import { useGetMealTable, useGetUser, useModal } from 'src/hooks';
import { GetLunchMenusResponse } from 'src/api';

import * as S from './styled';

export const MealTableScreen: React.FC = () => {
  const date = new Date();

  const { userData } = useGetUser();

  const { data, isLoading } = useGetMealTable({ month: `${date.getMonth() + 1}` });
  const mealData = data?.data;

  const { open, close, isOpen } = useModal();

  const filteredMealList = mealData?.filter(
    (meal) => new Date(meal.date).getDate() >= date.getDate(),
  );

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if ((isFocused && !userData) || (isFocused && Boolean(!mealData?.length) && !isLoading)) {
      open();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <MealTableLayout>
        <Spinner isCenter />
      </MealTableLayout>
    );
  } else if (!isLoading && mealData && mealData.length > 0 && userData) {
    return (
      <MealTableLayout>
        <S.MealTableWrapper
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            rowGap: 25,
          }}
        >
          <S.MealTableContainer>
            {filteredMealList
              ?.reduce<GetLunchMenusResponse[][]>((acc, currentValue, index) => {
                if (index % 2 === 0) acc.push([currentValue]);
                else acc[acc.length - 1].push(currentValue);
                return acc;
              }, [])
              .map((items, index) => (
                <S.MealTableListContainer key={index}>
                  {items.map((item, index) => (
                    <MealTableCard key={index} {...item} />
                  ))}
                </S.MealTableListContainer>
              ))}
          </S.MealTableContainer>
        </S.MealTableWrapper>
      </MealTableLayout>
    );
  } else {
    return (
      <MealTableLayout>
        <Modal
          modalVisible={isOpen}
          title="오류"
          text={'급식 정보를 불러오는데 실패했습니다.\n' + '다시 시도해주세요.'}
          button={
            <Button
              onPress={() => {
                navigation.goBack(), close();
              }}
            >
              확인
            </Button>
          }
        />
      </MealTableLayout>
    );
  }
};
