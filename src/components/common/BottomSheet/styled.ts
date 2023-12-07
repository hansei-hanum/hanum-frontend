import Animated from 'react-native-reanimated';

import styled from '@emotion/native';

export const BottomSheetContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const BottomSheetBackDrop = styled(BottomSheetContainer)`
  display: none;
  z-index: 9998;
`;
