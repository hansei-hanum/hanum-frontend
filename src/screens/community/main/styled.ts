import { Animated, Dimensions } from 'react-native';

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
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 12px;
`;

export const CommunityMainBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 10px;
  width: 100%;
`;

export const CommunityMainBoxHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const CommunityMainBoxContainer = styled(CommunityMainBox)`
  row-gap: 8px;
`;

export const CommunityMainBoxImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const CommunityMainBoxImage = styled.Image`
  // image의 size 만큼 height를 설정해줘야 함
  /* height: 300px; */
  width: 100%;
  height: 440;
  // center image
`;

export const TextWrapper2 = styled(Animated.View)`
  position: relative;
  z-index: 2;
  flex: 1;
  height: 100%;
`;
