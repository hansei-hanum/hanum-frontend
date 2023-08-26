import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import { Logo, LunchTableIcon, PartyIcon, PayIcon, ScheduleIcon } from 'src/assets';
import { AlertBox, Content, PayButton, ScheduleText, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenHeader>
        <WithLocalSvg width={110} height={40} asset={Logo} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => setNotifyClick(!notifyClick)}>
          <Ionicons
            name={notifyClick ? 'notifications' : 'notifications-outline'}
            size={28}
            color={notifyClick ? '#000' : '#AAA'}
          />
        </TouchableOpacity>
      </S.HomeScreenHeader>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          icon={PartyIcon}
          mainText="실시간으로 즐기기"
          subText="한세어울림한마당 진행 중!"
          navigateUrl="Main"
        />
        <Content icon={PayIcon} name="한움페이" navigateUrl="Main">
          <S.HomeScreenPayContainer>
            <Text size="26" fontFamily="bold" color={colors.black}>
              19,000원
            </Text>
            <S.HomeScreenPayButtonContainer>
              <PayButton text="결제" onPress={() => console.log('결제')} />
              <PayButton text="송금" onPress={() => console.log('송금')} />
            </S.HomeScreenPayButtonContainer>
          </S.HomeScreenPayContainer>
        </Content>
        <Content icon={ScheduleIcon} name="시간표" navigateUrl="Schedule">
          <S.HomeScreenScheduleContainer>
            <ScheduleText subText="이번 수업" mainText="영어" />
            <S.HomeScreenScheduleTextWrapper>
              <ScheduleText subText="이전 수업" mainText="공업" />
              <S.HomeScreenScheduleLine />
              <ScheduleText subText="다음 수업" mainText="수학" />
            </S.HomeScreenScheduleTextWrapper>
          </S.HomeScreenScheduleContainer>
        </Content>
        <Content icon={LunchTableIcon} name="급식표" navigateUrl="LunchTable">
          <S.HomeScreenLunchTableTextContainer>
            <Text size="15" fontFamily="bold" color={colors.placeholder}>
              오늘의 급식
            </Text>
            <S.HomeScreenLunchTableText>
              백미밥,카레소스(추가국),등심돈까스, 망고사과샐러드,포기김치,과일음료
            </S.HomeScreenLunchTableText>
          </S.HomeScreenLunchTableTextContainer>
        </Content>
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
