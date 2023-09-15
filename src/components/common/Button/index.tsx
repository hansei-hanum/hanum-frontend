import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from 'src/styles';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  isDisabled?: boolean;
  isModalBtn?: boolean;
  onPress?: () => void;
}

export const ButtonElement: React.FC<ButtonProps> = ({
  children,
  onPress,
  isDisabled,
  isModalBtn,
  backgroundColor,
  textColor,
}) => {
  const { handlePressIn, handlePressOut, buttonAnimatedStyle } = usePressingAnimation();

  return (
    <TouchableOpacity
      {...(!isDisabled && { onPress: onPress })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      containerStyle={{
        width: isModalBtn ? '48%' : '100%',
      }}
      style={{
        ...buttonAnimatedStyle,
        backgroundColor: backgroundColor ? backgroundColor : colors.primary,
        borderRadius: isModalBtn ? 16 : 10,
        paddingVertical: 14,
      }}
    >
      <S.ButtonText
        style={{
          color: textColor ? textColor : colors.white,
        }}
      >
        {children}
      </S.ButtonText>
    </TouchableOpacity>
  );
};

export interface ButtonContainerProps {
  children: React.ReactNode;
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
  return <S.ButtonContainer>{children}</S.ButtonContainer>;
};

export const Button = Object.assign(ButtonElement, {
  Container: ButtonContainer,
});
