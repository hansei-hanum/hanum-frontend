import { KeyboardAvoidingView, Platform, View } from 'react-native';

import styled from '@emotion/native';
import { TextInput } from '@react-native-material/core';

import { colors, fonts } from 'src/styles';
import { iosCheckHeight } from 'src/utils';

export const AuthWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const AuthContainer = styled.View`
  flex: 1;
  padding: 0 20px;
  padding-bottom: ${iosCheckHeight ? '5px' : '10px'};
  padding-top: ${iosCheckHeight ? '10px' : '20px'};
  justify-content: space-between;
`;

export const AuthInputContainer = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 20px;
`;

export const AuthTextContainer = styled.View`
  flex-direction: column;
  row-gap: 6px;
`;

export const AuthInput = styled(TextInput)`
  width: 100%;
  padding: 10px 0;
  margin-right: 20px;
  font-size: 16px;
  font-family: ${fonts.medium};
`;

export const AuthButtonWrapper = styled(Platform.OS == 'ios' ? KeyboardAvoidingView : View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
