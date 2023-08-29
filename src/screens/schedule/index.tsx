import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { Platform } from 'react-native';

import { Text, ClassList, WeekDay } from 'src/components';
import { ScheduleIcon } from 'src/assets';
import { CLASS_LIST, NUMBER_LIST } from 'src/constants';

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
        <ClassList list={NUMBER_LIST} isNumber />
        <ClassList list={CLASS_LIST} />
        <ClassList list={CLASS_LIST} isToday />
        <ClassList list={CLASS_LIST} />
        <ClassList list={CLASS_LIST} />
        <ClassList list={CLASS_LIST} />
      </S.ScheduleScreenTimeContainer>
    </S.ScheduleScreenContainer>
  );
};
