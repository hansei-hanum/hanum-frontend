import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

export const UserPostWrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const UserPostBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
  padding: 10px 0;
  position: relative;
`;

export const CommunityMainNoDataWrapper = styled.View`
  height: 70%;
  align-items: center;
  justify-content: center;
`;
