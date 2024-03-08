import { Animated } from 'react-native';

import styled from '@emotion/native';

export const CommunityMainMenuContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
  z-index: 9999;
  border-radius: 16px;
`;

export const CommunityMainMenu = styled(Animated.View)`
  width: 80px;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
`;

export const CommunityMainTopSection = styled.View`
  padding: 14px;
  flex-direction: column;
  row-gap: 40px;
  padding-bottom: 0;
`;
