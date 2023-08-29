import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { FlatList, Platform } from 'react-native';

import { Text } from 'src/components';
import { ScheduleIcon } from 'src/assets';
import { CLASS_LIST, NUMBER_LIST } from 'src/constants';
import { colors } from 'src/styles';
import { WeekDay } from 'src/components/schedule';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  return (
    <S.ScheduleScreenContainer>
      <S.ScheduleScreenHeader>
        <S.ScheduleScreenIconContainer>
          <WithLocalSvg
            width={Platform.OS === 'ios' ? 34 : 30}
            height={Platform.OS === 'ios' ? 34 : 30}
            asset={ScheduleIcon}
          />
          <Text size={Platform.OS === 'ios' ? '20' : '16'} fontFamily="bold">
            시간표
          </Text>
        </S.ScheduleScreenIconContainer>
        <Text size="17">클라우드보안과 2학년 2반</Text>
      </S.ScheduleScreenHeader>
      <WeekDay />
      <S.ScheduleScreenTimeContainer>
        <FlatList
          style={{ paddingTop: 32 }}
          data={NUMBER_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime style={{ height: 50 }}>
              <Text size="15" fontFamily="medium">
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
        <FlatList
          style={{ backgroundColor: 'rgba(69, 133, 254, 0.10)', paddingTop: 32 }}
          data={CLASS_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime key={item}>
              <Text size="15" fontFamily="medium" color={colors.black} isCenter>
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
        <FlatList
          style={{ paddingTop: 32 }}
          data={CLASS_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime key={item}>
              <Text size="15" fontFamily="medium" color={colors.placeholder} isCenter>
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
        <FlatList
          style={{ paddingTop: 32 }}
          data={CLASS_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime key={item}>
              <Text size="15" fontFamily="medium" color={colors.placeholder} isCenter>
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
        <FlatList
          style={{ paddingTop: 32 }}
          data={CLASS_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime key={item}>
              <Text size="15" fontFamily="medium" color={colors.placeholder} isCenter>
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
        <FlatList
          style={{ paddingTop: 32 }}
          data={CLASS_LIST}
          renderItem={({ item }) => (
            <S.ScheduleScreenTime key={item}>
              <Text size="15" fontFamily="medium" color={colors.placeholder} isCenter>
                {item}
              </Text>
            </S.ScheduleScreenTime>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
      </S.ScheduleScreenTimeContainer>
    </S.ScheduleScreenContainer>
  );
};
