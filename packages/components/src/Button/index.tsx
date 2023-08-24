import React from 'react';

import { css } from '@emotion/native';
import { colors } from '@hanum/styles';

import * as S from './styled';

export interface ButtonProps {
  children: React.ReactNode;
  isSecondary?: boolean;
  isDisabled?: boolean;
  width?: string;
  isModalBtn?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, isSecondary, onPress, isDisabled, width, isModalBtn }) => {
  return (
    <S.ButtonElement
      {...!isDisabled && { onPress: onPress }}
      isDisabled={isDisabled}
      isSecondary={isSecondary}
      activeOpacity={0.8}
      isModalBtn={isModalBtn}
      style={
        css`
        width: ${width}%;
        `
      }
    >
      <S.ButtonText
        style={
          isSecondary &&
          css`
            color: ${colors.black};
          `
        }
      >
        {children}
      </S.ButtonText>
    </S.ButtonElement >
  );
};
