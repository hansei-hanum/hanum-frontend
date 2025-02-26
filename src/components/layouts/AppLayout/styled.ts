import { KeyboardAvoidingView, View } from 'react-native';

import styled from '@emotion/native';

import { iosCheckHeight, isAndroid, isIos } from 'src/utils';

export const AppLayoutWrapper = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const AppLayoutContainer = styled(isIos ? KeyboardAvoidingView : View)`
  width: 100%;
  flex: 1;
  padding: 0 20px;
  margin-bottom: ${iosCheckHeight ? '5px' : isAndroid ? '15px' : '14px'};
  margin-top: ${iosCheckHeight ? '10px' : isAndroid ? '25px' : '20px'};
  justify-content: space-between;
  row-gap: 20px;
`;

export const AppLayoutButtonWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: ${isIos ? '10px' : '0'};
`;
