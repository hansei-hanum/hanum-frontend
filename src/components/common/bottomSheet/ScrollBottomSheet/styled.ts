import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import styled from '@emotion/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ScrollBottomSheetContainer = styled(Animated.View)`
  height: ${`${SCREEN_HEIGHT}px`};
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  position: absolute;
  top: ${`${SCREEN_HEIGHT}px`};
  border-radius: 25px;
`;

export const ScrollBottomSheetLine = styled.View`
  width: 75;
  height: 4;
  background-color: ${({ theme }) => theme.placeholder};
  align-self: center;
  margin: 15px 0;
  border-radius: 2px;
`;

export const Image = styled.Image`
  height: 140px;
  width: 100%;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 0.6px;
`;
