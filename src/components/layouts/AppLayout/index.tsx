import React, { RefObject } from 'react';
import { ScrollView, ViewProps } from 'react-native';

import { useSetRecoilState } from 'recoil';

import { Button, GoBackIcon, Text } from 'src/components';
import { authAtom } from 'src/atoms';

import * as S from './styled';

export interface MainSectionProps {
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
}

export const MainSection: React.FC<MainSectionProps> = ({
  headerText,
  subHeaderText,
  children,
}) => {
  return (
    <S.AuthLayoutMainSection>
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
    </S.AuthLayoutMainSection>
  );
};

export interface AppLayoutCustomProps extends MainSectionProps {
  isLoading?: boolean;
  onPress: () => void;
  bottomText: string;
  isDisabled?: boolean;
  withScrollView?: boolean;
  scrollViewRef?: RefObject<ScrollView>;
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
  withScrollView = false,
  scrollViewRef,
  ...props
}) => {
  const setAuth = useSetRecoilState(authAtom);

  const resetErrorMessage = () => {
    setAuth((prev) => ({ ...prev, errorMessage: '' }));
  };

  return (
    <S.AuthLayoutWrapper {...props}>
      <S.AuthLayoutContainer behavior="padding" keyboardVerticalOffset={15}>
        <GoBackIcon isLoading={isLoading} onPress={resetErrorMessage} />
        {withScrollView ? (
          <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 10 }}>
            <MainSection
              headerText={headerText}
              subHeaderText={subHeaderText}
              children={children}
            />
          </ScrollView>
        ) : (
          <MainSection headerText={headerText} subHeaderText={subHeaderText} children={children} />
        )}
        <S.AuthLayoutButtonWrapper>
          <Button onPress={onUserPress} isDisabled={isDisabled} isLoading={isLoading}>
            {bottomText}
          </Button>
        </S.AuthLayoutButtonWrapper>
      </S.AuthLayoutContainer>
    </S.AuthLayoutWrapper>
  );
};
