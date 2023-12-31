import { KeyboardAvoidingView, View } from 'react-native';

import styled from '@emotion/native';

import { iosCheckHeight, isAndroid, isIos } from 'src/utils';

export const AuthWrapper = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const AuthContainer = styled(isIos ? KeyboardAvoidingView : View)`
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

export const AuthButtonWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
