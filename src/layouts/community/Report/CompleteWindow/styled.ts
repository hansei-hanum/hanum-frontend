import { Animated, Dimensions } from 'react-native';

import styled from '@emotion/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ReportScreen = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  z-index: 9999;
  border: 1px solid red;
  transform: translateX(${`${SCREEN_WIDTH}px`});
`;
