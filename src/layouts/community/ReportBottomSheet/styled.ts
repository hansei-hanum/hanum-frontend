import { Dimensions } from 'react-native';
import ReAnimated from 'react-native-reanimated';

import styled from '@emotion/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ReportBottomSheetContainer = styled(ReAnimated.View)`
  height: ${`${SCREEN_HEIGHT}px`};
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  position: absolute;
  top: ${`${SCREEN_HEIGHT}px`};
  border-radius: 25px;
  z-index: 9999;
`;

export const ReportBottomSheetLine = styled.View`
  width: 75px;
  height: 4px;
  background-color: ${({ theme }) => theme.placeholder};
  align-self: center;
  margin: 15px 0;
  border-radius: 2px;
`;

export const ReportBottomSheetHeader = styled.View`
  width: 100%;
  row-gap: 10px;
  padding: 16px 16px;
`;

export const ReportBottmoSheetOptionList = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 16px 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.modalBg};
`;
