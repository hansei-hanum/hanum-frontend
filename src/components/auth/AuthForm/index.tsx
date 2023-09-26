/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { Button, CommonHeader, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface AuthProps {
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
  isDisabled: boolean;
  onPress: () => void;
  bottomText: string;
}

export const Auth: React.FC<AuthProps> = ({
  children,
  isDisabled,
  headerText,
  subHeaderText,
  onPress,
  bottomText,
}) => {
  return (
    <S.AuthWrapper>
      <S.AuthContainer behavior="padding" keyboardVerticalOffset={15}>
        <S.AuthInputContainer>
          <CommonHeader size={28} style={{ marginBottom: 10 }} />
          <S.AuthTextContainer>
            <Text size={26} fontFamily="bold">
              {headerText.split('\n').map((line, index) => (
                <Text size={26} fontFamily="bold" key={line}>
                  {line}
                  {index !== headerText.split('\n').length - 1 && <>{'\n'}</>}
                </Text>
              ))}
            </Text>
            {subHeaderText}
          </S.AuthTextContainer>
          {children}
        </S.AuthInputContainer>
        <S.AuthButtonWrapper>
          <Button
            isDisabled={isDisabled}
            onPress={onPress}
            backgroundColor={isDisabled ? colors.secondary : colors.primary}
          >
            {bottomText}
          </Button>
        </S.AuthButtonWrapper>
      </S.AuthContainer>
    </S.AuthWrapper>
  );
};
