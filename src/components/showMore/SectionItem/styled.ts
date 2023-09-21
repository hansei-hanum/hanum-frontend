import { Animated } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const SectionItem = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
`;

export const SectionIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`;

export const SectionIconWrapper = styled.View`
  padding: 4px;
  border-radius: 10px;
  background-color: ${colors.lightGray};
`;
