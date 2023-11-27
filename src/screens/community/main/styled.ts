import { Animated } from 'react-native';

import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunityMainWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunityMainSearchBarContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${isIos ? '12px' : '0px'} 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.secondary};
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

export const CommunityUserWrapper = styled.View`
  margin: 0 20px;
`;

export const CommunityUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  padding: 14px;
  border-top-color: ${({ theme }) => theme.lightGray};
  border-bottom-color: ${({ theme }) => theme.lightGray};
  border-top-width: 1px;
  border-bottom-width: 1px;
`;

export const CommunityImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
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
  row-gap: 14px;
  width: 100%;
  border-top-color: ${({ theme }) => theme.lightGray};
  border-bottom-color: ${({ theme }) => theme.lightGray};
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: 10px 0;
`;

export const CommunityMainBottom = styled.View`
  width: 74%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommunityMainBottomIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const TextWrapper2 = styled(Animated.View)`
  position: relative;
  z-index: 2;
  flex: 1;
  height: 100%;
`;
