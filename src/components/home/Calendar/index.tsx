import React from 'react';

import { CalendarIcon } from 'src/assets';
import { Text } from 'src/components';
import { colors } from 'src/styles';

import { Content } from '../Content';

import * as S from './styled';

export const Calendar: React.FC = () => {
  return (
    <Content icon={CalendarIcon} name="시간표" navigateUrl="Calendar">
      <S.CalendarContainer>
        <S.CalendarTextContainer>
          <Text size="15" fontFamily="bold" color={colors.placeholder}>
            7월 11일:{' '}
          </Text>
          <Text size="15" fontFamily="bold" color={colors.black}>
            소변검사/2,3
          </Text>
        </S.CalendarTextContainer>
        <S.CalendarTextContainer>
          <Text size="15" fontFamily="bold" color={colors.placeholder}>
            7월 12일:{' '}
          </Text>
          <Text size="15" fontFamily="bold" color={colors.black}>
            서울진로직업박람회 (~7/15)
          </Text>
        </S.CalendarTextContainer>
        <S.CalendarTextContainer>
          <Text size="15" fontFamily="bold" color={colors.placeholder}>
            7월 13일:{' '}
          </Text>
          <Text size="15" fontFamily="bold" color={colors.black}>
            서울진로직업박람회 (~7/15),{'\n'}
            직업기초능력평가 (고3)
          </Text>
        </S.CalendarTextContainer>
      </S.CalendarContainer>
    </Content>
  );
};
