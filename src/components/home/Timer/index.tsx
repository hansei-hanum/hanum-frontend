import React, { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components';

import { Content } from '../Content';

import * as S from './styled';

export interface TimerTextProps {
  subText: string;
  mainText: string;
}

export const TimerText: React.FC<TimerTextProps> = ({ subText, mainText }) => {
  const theme = useTheme();

  return (
    <S.TimerTextContainer>
      <Text size={14} fontFamily="medium" color={theme.placeholder}>
        {subText}
      </Text>
      <Text size={20} fontFamily="bold">
        {mainText}
      </Text>
    </S.TimerTextContainer>
  );
};

export const Timer: React.FC = () => {
  const isFocused = useIsFocused();

  const [time, setTime] = React.useState({
    lunch: '',
    home: '',
  });

  const formatTime = (now: Date, hour: number, minute: number) => {
    const minutes = now.getHours() * 60 + now.getMinutes();
    const target = hour * 60 + minute;
    const diff = target - minutes;

    return diff > 0 ? `${Math.floor(diff / 60)}시간 ${diff % 60}분` : '-';
  };

  const onUpdate = () => {
    const now = new Date();

    setTime({
      lunch: formatTime(now, 12, 30),
      home: formatTime(now, 16, 10),
    });
  };

  useEffect(() => {
    setInterval(onUpdate, 1000 * 60);
    onUpdate();
  }, [isFocused]);

  return (
    <Content icon="⌚︎" name="타이머">
      <S.TimerTextWrapper>
        <S.ScreenTimerContainer>
          <TimerText subText="점심시간까지" mainText={time.lunch} />
          <S.ScreenTimerLine />
          <TimerText subText="집에 가기까지" mainText={time.home} />
        </S.ScreenTimerContainer>
      </S.TimerTextWrapper>
    </Content>
  );
};
