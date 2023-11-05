import React from 'react';
import { TouchableOpacity } from 'react-native';

import { colors } from 'src/styles';
import { usePressingAnimation } from 'src/hooks';

import { Spinner } from '../Spinner';
import { Text } from '../Text';

import * as S from './styled';

export interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isModalBtn?: boolean;
  onPress?: () => void;
}

export const ButtonElement: React.FC<ButtonProps> = ({
  children,
  onPress,
  isModalBtn,
  isDisabled,
  isLoading,
  backgroundColor,
  textColor,
}) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();

  return (
    <TouchableOpacity
      {...(!isDisabled && {
        onPress: onPress,
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
      })}
      activeOpacity={isDisabled ? 0.4 : 0.8}
      style={{
        ...scaleAnimatedStyle,
        width: isModalBtn ? '48%' : '100%',
        backgroundColor: backgroundColor ? backgroundColor : colors.primary,
        borderRadius: isModalBtn ? 16 : 10,
        opacity: isDisabled || isLoading ? 0.4 : 1,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 6,
      }}
    >
      {isLoading && <Spinner color={colors.white} />}
      <Text size={16} isCenter color={textColor ? textColor : colors.white}>
        {children}
      </Text>
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
