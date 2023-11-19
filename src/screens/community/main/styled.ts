import Icon from 'react-native-vector-icons/MaterialIcons';
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
  overflow: hidden;
  align-items: center;
  padding: ${isIos ? '12px' : '0px'} 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.secondary};
`;

export const CommunityMainSearchBar = styled.TextInput`
  font-size: 16px;
  font-family: ${fonts.regular};
  flex-grow: 1;
`;

export const TextWrapper = styled.View`
  position: relative;
  z-index: -1;
  flex: 1;
  height: 100%;
`;

export const TextWrapper2 = styled(Animated.View)`
  position: relative;
  z-index: 2;
  flex: 1;
  height: 100%;
`;
