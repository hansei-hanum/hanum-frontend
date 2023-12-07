/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { useRecoilValue } from 'recoil';

import { Button, GoBackIcon, Text } from 'src/components';
import { isDisableAtom } from 'src/atoms';

import * as S from './styled';

export interface AuthProps {
  isLoading: boolean;
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
  onPress: () => void;
  bottomText: string;
}

export const Auth: React.FC<AuthProps> = ({
  children,
  headerText,
  subHeaderText,
  onPress,
  bottomText,
  isLoading,
}) => {
  const isDisabled = useRecoilValue(isDisableAtom);

  return (
    <S.AuthWrapper>
      <S.AuthContainer behavior="padding" keyboardVerticalOffset={15}>
        <S.AuthInputContainer>
          <GoBackIcon isLoading={isLoading} />
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
          <Button onPress={onPress} isDisabled={isDisabled} isLoading={isLoading}>
            {bottomText}
          </Button>
        </S.AuthButtonWrapper>
      </S.AuthContainer>
    </S.AuthWrapper>
  );
};
