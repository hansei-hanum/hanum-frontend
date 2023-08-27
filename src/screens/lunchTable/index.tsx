import React, { useEffect, useRef, useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ScrollView, Switch } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Text } from 'src/components';
import { LunchTableIcon } from 'src/assets';
import { colors } from 'src/styles';
import { boxShadow } from 'src/constant';

import * as S from './styled';

const LUNCH_MAP = [
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: true,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
  {
    date: '5/27(수)',
    lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
    isPrimary: false,
  },
];

export const LunchTableScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
  };

  const ITEM_HEIGHT = 230;
  const isFocused = useIsFocused();

  useEffect(() => {
    const primaryIndex = LUNCH_MAP.findIndex((item) => item.isPrimary);
    if (primaryIndex !== -1 && scrollViewRef.current) {
      setTimeout(() => {
        const yOffset = primaryIndex * ITEM_HEIGHT;
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
          {LUNCH_MAP.map(({ date, lunch, isPrimary }, index) => (
            <S.LunchBoxContainer
              key={index}
              style={[
                boxShadow,
                {
                  backgroundColor: isPrimary ? colors.primary : colors.white,
                },
              ]}
            >
              <Text size="22" fontFamily="bold" color={isPrimary ? colors.white : colors.black}>
                {date}
              </Text>
              {lunch.split(',').map((item, index) => (
                <Text
                  fontFamily="bold"
                  key={index}
                  size="16"
                  color={isPrimary ? colors.white : colors.black}
                >
                  {item}
                </Text>
              ))}
            </S.LunchBoxContainer>
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
