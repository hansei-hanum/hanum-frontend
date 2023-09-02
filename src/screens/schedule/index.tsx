import React from 'react';
import { WithLocalSvg } from 'react-native-svg';

import { Text, ClassList, WeekDay } from 'src/components';
import { CLASS_LIST, NUMBER_LIST, headerIconStyle } from 'src/constants';

import { ScheduleIcon } from '../../../assets/icons';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  return (
    <S.ScheduleScreenWrapper>
      <S.ScheduleScreenContainer>
        <S.ScheduleScreenHeader>
          <S.ScheduleScreenIconContainer>
            <WithLocalSvg
              width={headerIconStyle.width}
              height={headerIconStyle.height}
              asset={ScheduleIcon}
            />
            <Text size={20} fontFamily="bold">
              시간표
            </Text>
          </S.ScheduleScreenIconContainer>
          <Text size={17}>클라우드보안과 2학년 2반</Text>
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
    </S.ScheduleScreenWrapper>
  );
};
