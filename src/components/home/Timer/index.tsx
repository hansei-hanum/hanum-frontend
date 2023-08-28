import React from 'react';

import { TimerIcon } from 'src/assets';
import { Text } from 'src/components';
import { colors } from 'src/styles';

import { Content } from '../Content';

import * as S from './styled';

export interface TimerTextProps {
  subText: string;
  mainText: string;
}

export const TimerText: React.FC<TimerTextProps> = ({ subText, mainText }) => {
  return (
    <S.TimerTextContainer>
      <Text size="14" fontFamily="medium" color={colors.placeholder}>
        {subText}
      </Text>
      <Text size="22" fontFamily="bold" color={colors.black}>
        {mainText}
      </Text>
    </S.TimerTextContainer>
  );
};

export const Timer: React.FC = () => {
  return (
    <Content icon={TimerIcon} name="시간표" navigateUrl="Timer">
      <S.TimerTextWrapper>
        <S.ScreenTimerContainer>
          <TimerText subText="점심시간까지" mainText="1시간 12분" />
          <S.ScreenTimerLine />
          <TimerText subText="집에 가기까지" mainText="6시간 12분" />
        </S.ScreenTimerContainer>
      </S.TimerTextWrapper>
    </Content>
  );
};
