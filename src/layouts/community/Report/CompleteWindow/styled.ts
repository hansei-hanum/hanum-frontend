import { Animated } from 'react-native';

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
`;

export const CompleteWindowHeader = styled.View`
  row-gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const CompleteWindowContentContainer = styled.View`
  margin-top: 50px;
  row-gap: 10px;
`;

export const CompleteWindowContent = styled.View`
  flex-direction: row;
  column-gap: 10px;
  padding: 0 20px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;
