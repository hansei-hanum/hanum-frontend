import styled from '@emotion/native';
import LottieView from 'lottie-react-native';

import { colors } from 'src/styles';
import { isIos } from 'src/utils';

export const StatusScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  justify-content: space-between;
  padding: 20px;
`;

export const StatusScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  padding: 20px;
`;

export const StatusScreenLottie = styled(LottieView)`
  width: 130px;
  height: 130px;
`;

export const StatusButtonWrapper = styled.View`
  margin: ${isIos ? '0 20px' : '0'};
`;
