import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewProps } from 'react-native';

import { useTheme } from '@emotion/react';

import { usePressingAnimation } from 'src/hooks';

import { Spinner } from '../Spinner';
import { Text } from '../Text';

import * as S from './styled';

export interface ButtonCustomProps {
  children: React.ReactNode;
  backgroundColor?: string;
  isWhite?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isModalBtn?: boolean;
  onPress?: () => void;
}

export type ButtonProps = ButtonCustomProps & TouchableOpacityProps;

export const ButtonElement: React.FC<ButtonProps> = ({
  children,
  onPress,
  isModalBtn,
  isDisabled,
  isLoading,
  backgroundColor,
  isWhite,
  ...props
}) => {
  const theme = useTheme();
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();

  const buttonBgColor = () => {
    if (backgroundColor) {
      return backgroundColor;
    } else if (isWhite) {
      return theme.secondary;
    } else {
      return theme.primary;
    }
  };

  return (
    <TouchableOpacity
      {...(!isDisabled &&
        !isLoading && {
          onPress: onPress,
          onPressIn: handlePressIn,
          onPressOut: handlePressOut,
        })}
      style={{
        ...scaleAnimatedStyle,
        backgroundColor: buttonBgColor(),
        width: isModalBtn ? '48%' : '100%',
        borderRadius: isModalBtn ? 16 : 10,
        opacity: isDisabled || isLoading ? 0.4 : 1,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 6,
      }}
      {...props}
      activeOpacity={isLoading || isDisabled ? 0.4 : 0.8}
    >
      {isLoading && <Spinner color={theme.white} size={20} />}
      <Text size={16} isCenter color={isWhite ? theme.default : theme.white}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export interface ButtonContainerProps {
  children: React.ReactNode;
}

export type ButtonContainerCustomProps = ButtonContainerProps & ViewProps;

export const ButtonContainer: React.FC<ButtonContainerCustomProps> = ({ children, ...props }) => {
  return <S.ButtonContainer {...props}>{children}</S.ButtonContainer>;
};

export const Button = Object.assign(ButtonElement, {
  Container: ButtonContainer,
});
