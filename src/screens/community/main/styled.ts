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
  justify-content: flex-end;
  margin-left: 10px;
`;

export const CommunityUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;

export const CommunityImage = styled.Image`
  border-radius: 100px;
  width: 44px;
  height: 44px;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 1px;
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
  border-top-color: ${({ theme }) => theme.lightGray};
  border-bottom-color: ${({ theme }) => theme.lightGray};
  border-top-width: 1px;
  border-bottom-width: 1px;
`;

export const CommunityMainBoxHeaderContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  row-gap: 12px;
`;

export const CommunityMainBoxHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  padding-top: 20px;
`;

export const CommunityMainBoxHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const CommunityMainBoxUserProfile = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CommunityMainContentWrapper = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const CommunityMainImageCardWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CommunityMainBottom = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: 20px;
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
