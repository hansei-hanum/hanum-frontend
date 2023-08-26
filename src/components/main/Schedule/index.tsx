import React from 'react';

import { ScheduleIcon } from 'src/assets';
import { Text } from 'src/components';
import { colors } from 'src/styles';

import { Content } from '../Content';

import * as S from './styled';

export interface ScheduleTextProps {
  subText: string;
  mainText: string;
}

export const ScheduleText: React.FC<ScheduleTextProps> = ({ subText, mainText }) => {
  return (
    <S.SScheduleTextContainer>
      <Text size="15" fontFamily="bold" color={colors.placeholder}>
        {subText}
      </Text>
      <Text size="22" fontFamily="bold" color={colors.black}>
        {mainText}
      </Text>
    </S.SScheduleTextContainer>
  );
};

export const Schedule: React.FC = () => {
  return (
    <Content icon={ScheduleIcon} name="시간표" navigateUrl="Schedule">
      <S.ScheduleTextWrapper>
        <S.ScreenScheduleContainer>
          <ScheduleText subText="급식 까지" mainText="1시간 12분" />
          <S.ScreenScheduleLine />
          <ScheduleText subText="집에 가기까지" mainText="6시간 12분" />
        </S.ScreenScheduleContainer>
      </S.ScheduleTextWrapper>
    </Content>
  );
};
