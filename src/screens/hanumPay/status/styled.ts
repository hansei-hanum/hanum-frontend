import styled from '@emotion/native';
import LottieView from 'lottie-react-native';

import { colors } from 'src/styles';

export const StatusScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const StatusScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;

export const StatusScreenLottie = styled(LottieView)`
  width: 160px;
  height: 160px;
`;
