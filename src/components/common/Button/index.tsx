import React from 'react';

import { colors } from 'src/styles';

import * as S from './styled';

export interface ButtonProps {
  children: React.ReactNode;
  isSecondary?: boolean;
  isDisabled?: boolean;
  isDanger?: boolean;
  isModalBtn?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isSecondary,
  onPress,
  isDisabled,
  isModalBtn,
  isDanger,
}) => {
  return (
    <S.ButtonElement
      {...(!isDisabled && { onPress: onPress })}
      activeOpacity={0.8}
      style={{
        width: isModalBtn ? '48%' : '100%',
        backgroundColor:
          isSecondary || isDisabled ? colors.secondary : isDanger ? colors.danger : colors.primary,
        borderRadius: isModalBtn ? 16 : 10,
      }}
    >
      <S.ButtonText
        style={{
          color: isSecondary ? colors.black : colors.white,
        }}
      >
        {children}
      </S.ButtonText>
    </S.ButtonElement>
  );
};
