import { Animated } from 'react-native';

import styled from '@emotion/native';

export const CommunityMainBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  position: relative;
`;

export const CommunityMainMenuContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.lightPrimary};
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
  width: 100%;
  padding: 14px;
  flex-direction: column;
  row-gap: 40px;
  padding-bottom: 0;
`;

export const CommunityMainNoDataWrapper = styled.View`
  height: 60%;
  align-items: center;
  justify-content: center;
`;
