import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

export const CommunityMineHeader = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightGray};
`;

export const CommunityMineWrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunityMinePostBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
  padding: 10px 0;
  position: relative;
`;

export const CommunityMineBottomSheetContainer = styled.View`
  row-gap: 30px;
  padding: 14px;
  z-index: 9999;
`;

export const CommunityMineOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommunityMainOptionIconContainer = styled(CommunityMineOptionContainer)`
  column-gap: 10px;
  justify-content: center;
`;
