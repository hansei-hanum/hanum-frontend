import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

export const CommunityMainWrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding-bottom: 40px;
`;

export const CommunityMainBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
  padding: 10px 0;
  position: relative;
`;
