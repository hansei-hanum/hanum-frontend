import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';
import { isIos } from 'src/utils';
import { CalendarIcon } from 'src/assets';

import { Content } from '../Content';

import * as S from './styled';

export const Calendar: React.FC = () => {
  const fontSize = isIos ? 15 : 14;
  return (
    <Content icon={CalendarIcon} name="학사 일정" navigateUrl="Calendar">
      <S.CalendarContainer>
        <S.CalendarTextContainer>
          <Text size={fontSize} fontFamily="medium" color={colors.placeholder}>
            7월 11일:{' '}
          </Text>
          <Text size={fontSize} fontFamily="medium" color={colors.black}>
            소변검사/2,3
          </Text>
        </S.CalendarTextContainer>
        <S.CalendarTextContainer>
          <Text size={fontSize} fontFamily="medium" color={colors.placeholder}>
            7월 12일:{' '}
          </Text>
          <Text size={fontSize} fontFamily="medium" color={colors.black}>
            서울진로직업박람회 (~7/14)
          </Text>
        </S.CalendarTextContainer>
        <S.CalendarTextContainer>
          <Text size={fontSize} fontFamily="medium" color={colors.placeholder}>
            7월 13일:{' '}
          </Text>
          <Text size={fontSize} fontFamily="medium" color={colors.black}>
            서울진로직업박람회 (~7/15),{'\n'}
            직업기초능력평가 (고3)
          </Text>
        </S.CalendarTextContainer>
      </S.CalendarContainer>
    </Content>
  );
};
