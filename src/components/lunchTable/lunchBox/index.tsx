import React from 'react';
import { View } from 'react-native';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface LunchBoxProps {
  isPrimary: boolean;
  date: string;
  lunch: string;
  ref: React.Ref<View>;
}

export const LunchBox: React.FC<LunchBoxProps> = ({ isPrimary, date, lunch, ref }) => {
  console.log(ref, 'LunchBox');
  return (
    <S.LunchBoxContainer
      ref={ref}
      style={{
        backgroundColor: isPrimary ? colors.primary : colors.white,
        shadowColor: '#B0B9C2',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 40,
      }}
    >
      <Text size="22" fontFamily="bold" color={isPrimary ? colors.white : colors.black}>
        {date}
      </Text>
      {lunch.split(',').map((item, index) => (
        <Text
          fontFamily="bold"
          key={index}
          size="16"
          color={isPrimary ? colors.white : colors.black}
        >
          {item}
        </Text>
      ))}
    </S.LunchBoxContainer>
  );
};
