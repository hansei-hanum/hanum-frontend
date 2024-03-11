import { Animated } from 'react-native';

import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunityMainSearchBarContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${isIos ? '12px' : '0px'} 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.secondary};
  column-gap: 10px;
`;

export const CommunityMainSearchBar = styled.TextInput`
  font-size: 16px;
  font-family: ${fonts.regular};
  flex-grow: 1;
  color: ${({ theme }) => theme.default};
`;

export const CommunityMainIconWrapper = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

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
  padding: 10px;
`;

export const CommunityMainSearchBarWrapper = styled(Animated.View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
