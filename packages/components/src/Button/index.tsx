import React from 'react';

import { css } from '@emotion/native';
import { colors } from '@hanum/styles';

import * as S from './styled';

export interface ButtonProps {
  children: React.ReactNode;
  isSecondary?: boolean;
  isDisabled?: boolean;
  isModal?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, isSecondary, onPress, isDisabled, isModal }) => {
  return (
    <S.ButtonElement
      {...!isDisabled && { onPress: onPress }}
      isDisabled={isDisabled}
      isModal={isModal}
      isSecondary={isSecondary}
      activeOpacity={0.8}
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
    </S.ButtonElement>
  );
};
