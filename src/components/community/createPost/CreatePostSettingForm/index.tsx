import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { Button, ScreenHeader } from 'src/components';

import * as S from './styled';

export interface CreatePostSettingFormProps {
  keyboardAvoidingViewEnabled?: boolean;
  headerTitle: string;
  onButtonPress: () => void;
  children?: React.ReactNode;
}

export const CreatePostSettingForm: React.FC<CreatePostSettingFormProps> = ({
  keyboardAvoidingViewEnabled = false,
  headerTitle,
  onButtonPress,
  children,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title={headerTitle} />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        enabled={keyboardAvoidingViewEnabled}
      >
        <S.CreatePostSettingFormWrapper>
          <S.CreatePostSettingFormContainer>{children}</S.CreatePostSettingFormContainer>
          <Button onPress={onButtonPress}>완료</Button>
        </S.CreatePostSettingFormWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
