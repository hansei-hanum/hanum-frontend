import { Animated } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ShowMoreScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
`;

export const ShowMoreHeaderScreen = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;

export const ShowMoreUserContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
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
