import { Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunityMainWrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding-bottom: 40px;
  border: 1px solid red;
`;

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

export const CommunityUserWrapper = styled.View``;

export const CommunityUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;

export const CommunityUserThinkBox = styled.View`
  flex: 1;
  align-items: flex-start;
  padding: 14px;
  justify-content: center;
  background-color: ${({ theme }) => theme.lightGray};
  border-radius: 12px;
`;

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
