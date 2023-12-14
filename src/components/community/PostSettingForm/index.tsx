import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { Button } from 'src/components';

import { CommunityHeader } from '../Header';

import * as S from './styled';

export interface PostSettingFormProps {
  keyboardAvoidingViewEnabled?: boolean;
  headerTitle: string;
  onButtonPress: () => void;
  children?: React.ReactNode;
}

export const PostSettingForm: React.FC<PostSettingFormProps> = ({
  keyboardAvoidingViewEnabled = false,
  headerTitle,
  onButtonPress,
  children,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommunityHeader title={headerTitle} />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        enabled={keyboardAvoidingViewEnabled}
      >
        <S.PostSettingFormWrapper>
          <S.PostSettingFormContainer>{children}</S.PostSettingFormContainer>
          <Button onPress={onButtonPress}>완료</Button>
        </S.PostSettingFormWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
