import ReAnimated from 'react-native-reanimated';

import styled from '@emotion/native';

import { SCREEN_HEIGHT } from 'src/constants';

export const ReportBottomSheetContainer = styled(ReAnimated.View)`
  height: ${`${SCREEN_HEIGHT}px`};
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  position: absolute;
  top: ${`${SCREEN_HEIGHT}px`};
  border-radius: 25px;
  z-index: 9998;
`;

export const ReportBottomSheetLine = styled.View`
  width: 75px;
  height: 4px;
  background-color: ${({ theme }) => theme.placeholder};
  align-self: center;
  margin: 15px 0;
  border-radius: 2px;
`;
