import React from 'react';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface PayButtonProps {
  onPress: () => void;
  text: string;
}

export const PayButton: React.FC<PayButtonProps> = ({ onPress, text }) => {
  return (
    <S.PayButtonElement activeOpacity={0.4} onPress={onPress}>
      <Text size="15" fontFamily="bold" color={colors.black}>
        {text}
      </Text>
    </S.PayButtonElement>
  );
};
