/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Button, GoBackIcon, Text } from 'src/components';
import { authAtom, isDisableAtom } from 'src/atoms';

import * as S from './styled';

export interface AuthLayoutProps {
  isLoading: boolean;
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
  onPress: () => void;
  bottomText: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  headerText,
  subHeaderText,
  onPress,
  bottomText,
  isLoading,
}) => {
  const setAuth = useSetRecoilState(authAtom);
  const isDisabled = useRecoilValue(isDisableAtom);

  const resetErrorMessage = () => {
    setAuth((prev) => ({ ...prev, errorMessage: '' }));
  };

  return (
    <S.AuthLayoutWrapper>
      <S.AuthLayoutContainer behavior="padding" keyboardVerticalOffset={15}>
        <S.AuthLayoutTopSection>
          <GoBackIcon isLoading={isLoading} onPress={resetErrorMessage} />
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
        </S.AuthLayoutTopSection>
        <S.AuthLayoutButtonWrapper>
          <Button onPress={onPress} isDisabled={isDisabled} isLoading={isLoading}>
            {bottomText}
          </Button>
        </S.AuthLayoutButtonWrapper>
      </S.AuthLayoutContainer>
    </S.AuthLayoutWrapper>
  );
};
