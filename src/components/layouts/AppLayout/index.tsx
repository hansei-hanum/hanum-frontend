import React from 'react';
import { ScrollView, ViewProps } from 'react-native';

import { useSetRecoilState } from 'recoil';

import { Button, GoBackIcon, Text } from 'src/components';
import { authAtom } from 'src/atoms';

import * as S from './styled';

export interface AppLayoutCustomProps {
  isLoading?: boolean;
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
  onPress: () => void;
  bottomText: string;
  isDisabled?: boolean;
  scrollEnabled?: boolean;
}

export type AppLayoutProps = AppLayoutCustomProps & ViewProps;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  headerText,
  subHeaderText,
  bottomText,
  isLoading,
  onPress: onUserPress,
  isDisabled = false,
  scrollEnabled = false,
  ...props
}) => {
  const setAuth = useSetRecoilState(authAtom);

  const resetErrorMessage = () => {
    setAuth((prev) => ({ ...prev, errorMessage: '' }));
  };

  return (
    <S.AuthLayoutWrapper {...props}>
      <S.AuthLayoutContainer behavior="padding" keyboardVerticalOffset={15}>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }} scrollEnabled={scrollEnabled}>
          <S.AuthLayoutTopSection>
            <GoBackIcon isLoading={isLoading} onPress={resetErrorMessage} />
            <S.AuthTextContainer>
              <Text size={26} fontFamily="bold">
                {headerText.split('\n').map((line, index) => (
                  <Text size={26} fontFamily="bold" key={line}>
                    {line}
                    {index !== headerText.split('\n').length - 1 && '\n'}
                  </Text>
                ))}
              </Text>
              {subHeaderText}
            </S.AuthTextContainer>
            {children}
          </S.AuthLayoutTopSection>
        </ScrollView>
        <S.AuthLayoutButtonWrapper>
          <Button onPress={onUserPress} isDisabled={isDisabled} isLoading={isLoading}>
            {bottomText}
          </Button>
        </S.AuthLayoutButtonWrapper>
      </S.AuthLayoutContainer>
    </S.AuthLayoutWrapper>
  );
};
