import React, { useEffect, useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ScrollView } from 'react-native';

import { ActivityIndicator } from '@react-native-material/core';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Text, ClassList, WeekDay, Modal, Button, DummyContainer } from 'src/components';
import { NUMBER_LIST } from 'src/constants';
import { ScheduleIcon } from 'src/assets';
import { useGetTimeTable, useGetUser } from 'src/hooks';
import { colors } from 'src/styles';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { data, isLoading } = useGetTimeTable();
  const { classroom, grade, department, verifyUser } = useGetUser();

  const checkToday = (date: string) => {
    const today = new Date().getDay();
    const day = new Date(date).getDay();

    return today === day;
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !verifyUser) {
      setModalVisible(true);
    }
  }, [isFocused]);

  if (verifyUser) {
    return (
      <S.ScheduleScreenWrapper>
        <S.ScheduleScreenContainer>
          <S.ScheduleScreenHeader>
            <S.ScheduleScreenIconContainer>
              <WithLocalSvg width={32} height={32} asset={ScheduleIcon} />
              <Text size={20} fontFamily="bold">
                시간표
              </Text>
            </S.ScheduleScreenIconContainer>
            <Text size={17}>
              {department} {grade}학년 {classroom}반
            </Text>
          </S.ScheduleScreenHeader>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <WeekDay />
            {!isLoading && (
              <S.ScheduleScreenTimeContainer>
                <ClassList list={NUMBER_LIST} isNumber />
                {data?.data.map((item) => (
                  <ClassList key={item.date} list={item.data} isToday={checkToday(item.date)} />
                ))}
              </S.ScheduleScreenTimeContainer>
            )}
          </ScrollView>
          {isLoading && (
            <ActivityIndicator
              size={26}
              color={colors.black}
              style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
            />
          )}
        </S.ScheduleScreenContainer>
      </S.ScheduleScreenWrapper>
    );
  } else {
    return (
      <>
        <DummyContainer />
        <Modal
          modalVisible={modalVisible}
          title="인증 실패"
          text={
            '시간표 서비스는 재학생만 이용할 수 있어요.\n' +
            '만약 재학생이라면 프로필에서 재학생 인증을 진행하고 다시 시도해보세요.'
          }
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
      </>
    );
  }
};
