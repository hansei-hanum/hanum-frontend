import { KeyboardAvoidingView, Platform, View } from 'react-native';

import styled from '@emotion/native';
import { TextInput } from '@react-native-material/core';

import { colors, fonts } from 'src/styles';

export const AuthContainer = styled.SafeAreaView`
  flex: 1;
  padding: 70px 20px ${Platform.OS == 'ios' ? '30px' : '20px'} 20px;
  padding-top: ${Platform.OS == 'ios' ? '70px' : '30px'};
  background-color: ${colors.white};
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
