import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Icon, Text } from 'src/components';

import * as S from './styled';

export const CalendarScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <S.CalendarWrapper>
      <S.CalendarContainer style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={28} color="black" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <S.CalendarTitleContainer>
          <Icon icon="📆" />
          <Text size={20} fontFamily="bold">
            학사일정
          </Text>
        </S.CalendarTitleContainer>
        <S.CalendarElement />
        <Text size={16}>Calendar Screen</Text>
      </S.CalendarContainer>
    </S.CalendarWrapper>
  );
};
