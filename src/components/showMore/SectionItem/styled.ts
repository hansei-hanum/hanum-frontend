import { Animated } from 'react-native';

import styled from '@emotion/native';

export const SectionItemWrapper = styled(Animated.View)`
  border-radius: 16px;
  padding: 4px;
  padding-left: 0;
`;

export const SectionItem = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`;
