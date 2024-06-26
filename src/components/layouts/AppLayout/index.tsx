import React, { RefObject } from 'react';
import { ScrollView, ViewProps } from 'react-native';

import { useSetRecoilState } from 'recoil';

import { Button, GoBackIcon, NoScrollbarScrollView } from 'src/components';
import { authAtom } from 'src/atoms';

import {
  AppLayoutWithoutButton,
  AppLayoutWithoutButtonCustomProps,
} from '../AppLayoutWithoutButton';

import * as S from './styled';

export interface AppLayoutCustomProps extends AppLayoutWithoutButtonCustomProps {
  isLoading?: boolean;
  onPress?: () => void;
  bottomText: string;
  isDisabled?: boolean;
  withScrollView?: boolean;
  scrollViewRef?: RefObject<ScrollView>;
  hasOwnButton?: React.ReactNode;
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
  hasOwnButton,
  ...props
}) => {
  const setAuth = useSetRecoilState(authAtom);

  const resetErrorMessage = () => {
    setAuth((prev) => ({ ...prev, errorMessage: '' }));
  };

  return (
    <S.AppLayoutWrapper {...props}>
      <S.AppLayoutContainer behavior="padding" keyboardVerticalOffset={15}>
        <GoBackIcon isLoading={isLoading} onPress={resetErrorMessage} />
        {withScrollView ? (
          <NoScrollbarScrollView contentContainerStyle={{ paddingBottom: 10 }} ref={scrollViewRef}>
            <AppLayoutWithoutButton
              headerText={headerText}
              subHeaderText={subHeaderText}
              children={children}
            />
          </NoScrollbarScrollView>
        ) : (
          <AppLayoutWithoutButton
            headerText={headerText}
            subHeaderText={subHeaderText}
            children={children}
          />
        )}
        <S.AppLayoutButtonWrapper>
          {hasOwnButton ? (
            hasOwnButton
          ) : (
            <Button onPress={onUserPress} isDisabled={isDisabled} isLoading={isLoading}>
              {bottomText}
            </Button>
          )}
        </S.AppLayoutButtonWrapper>
      </S.AppLayoutContainer>
    </S.AppLayoutWrapper>
  );
};
