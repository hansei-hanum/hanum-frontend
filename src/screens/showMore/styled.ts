import { Animated } from 'react-native';

import styled from '@emotion/native';

export const ShowMoreScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.background};
`;

export const ShowMoreScreenContainer = styled.View`
  padding: 0 10px;
  row-gap: 16px;
`;

export const ShowMoreUserContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
`;

export const ShowMoreUserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const ShowMoreUserImage = styled.Image`
  border-radius: 100px;
  width: 56px;
  height: 56px;
`;

export const ShowMoreUserNameContainer = styled.View`
  flex-direction: column;
  row-gap: 3px;
`;
