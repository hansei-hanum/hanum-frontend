import { Animated } from 'react-native';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const CommunityMainAnimatedHeader = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  padding: ${isIos ? '12px' : '0px'} 10px;
`;

export const CommunityMainSearchBarWrapper = styled(Animated.View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 14px;
`;

export const CommunityMainScopeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const CommunityMainLeftSection = styled(CommunityMainScopeContainer)`
  column-gap: 10px;
`;
