import ReAnimated from 'react-native-reanimated';

import styled from '@emotion/native';

import { SCREEN_HEIGHT } from 'src/constants';

export const ScrollBottomSheetContainer = styled(ReAnimated.View)`
  height: ${`${SCREEN_HEIGHT}px`};
  width: 100%;
  position: absolute;
  top: ${`${SCREEN_HEIGHT}px`};
  border-radius: 25px;
  z-index: 9999;
  background-color: ${({ theme }) => theme.background};
`;

export const ScrollBottomSheetLine = styled.View`
  width: 75px;
  height: 4px;
  align-self: center;
  margin: 15px 0;
  border-radius: 2px;
  color: red;
`;
