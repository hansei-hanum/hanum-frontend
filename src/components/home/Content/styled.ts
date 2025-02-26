import { Animated } from 'react-native';

import styled from '@emotion/native';

export const ContentWrapper = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 16px;
  padding-top: 0;
`;

export const ContentTopSectionWrapper = styled(Animated.View)`
  border-radius: 16px;
  width: 100%;
  margin-top: 4px;
  padding: 12px;
`;

export const ContentTopSection = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentIconContainer = styled(ContentTopSection)`
  justify-content: auto;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 0;
`;
