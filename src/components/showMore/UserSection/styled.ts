import { Animated } from 'react-native';

import styled from '@emotion/native';

export const UserSectionContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
`;

export const UserSectionProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const UserSectionImage = styled.Image`
  border-radius: 100px;
  width: 56px;
  height: 56px;
`;

export const UserSectionNameContainer = styled.View`
  flex-direction: column;
  row-gap: 3px;
`;
