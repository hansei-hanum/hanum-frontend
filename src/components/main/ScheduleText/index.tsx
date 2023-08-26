import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface ScheduleTextProps {
  subText: string;
  mainText: string;
}

export const ScheduleText: React.FC<ScheduleTextProps> = ({ subText, mainText }) => {
  return (
    <S.HomeScreenScheduleTextContainer>
      <Text size="13" fontFamily="bold" color={colors.placeholder}>
        {subText}
      </Text>
      <Text size="26" fontFamily="bold" color={colors.black}>
        {mainText}
      </Text>
    </S.HomeScreenScheduleTextContainer>
  );
};
