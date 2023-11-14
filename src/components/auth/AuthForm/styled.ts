import { KeyboardAvoidingView, Platform, View } from 'react-native';

import styled from '@emotion/native';
import { TextInput } from '@react-native-material/core';

import { fonts } from 'src/styles';
import { iosCheckHeight, isAndroid } from 'src/utils';

export const AuthWrapper = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const AuthContainer = styled(Platform.OS == 'ios' ? KeyboardAvoidingView : View)`
  width: 100%;
  flex: 1;
  padding: 0 20px;
  margin-bottom: ${iosCheckHeight ? '5px' : isAndroid ? '15px' : '14px'};
  margin-top: ${iosCheckHeight ? '10px' : isAndroid ? '25px' : '20px'};
  justify-content: space-between;
`;

export const AuthInputContainer = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 20px;
`;

export const AuthTextContainer = styled.View`
  margin-top: 10px;
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

export const AuthButtonWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
