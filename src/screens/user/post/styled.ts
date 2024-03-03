import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

export const UserPostHeader = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightGray};
`;

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
