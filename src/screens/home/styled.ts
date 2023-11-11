import { Animated } from 'react-native';

import styled from '@emotion/native';

import { RPH, checkHeight, isAndroid } from 'src/utils';

export const HomeScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const HomeScreenContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const HomeScreenHeaderIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  column-gap: 20px;
  position: relative;
  bottom: ${isAndroid ? '8px' : '0px'};
`;

export const HomeScreenHeader = styled(Animated.View)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  padding: 6px 20px;
  padding-top: ${checkHeight ? `${RPH(6.4)}px` : '42px'};
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
  z-index: 10;
`;
