import { Animated, TouchableOpacity } from 'react-native';

import styled from '@emotion/native';

import { SCREEN_WIDTH } from 'src/constants';

export const CompleteWindowContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  z-index: 9998;
  transform: translateX(${`${SCREEN_WIDTH}px`});
  align-items: center;
  padding: 0 20px;
  padding-top: 20px;
  row-gap: 20px;
`;

export const CompleteWindowHeader = styled.View`
  row-gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const CompleteWindowButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 10px;
  padding: 14px 0;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
