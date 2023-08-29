import { Animated } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const SectionContainer = styled.View`
  width: 100%;
  flex-direction: column;
  row-gap: 40px;
  padding: 0 10px;
  margin-top: 10px;
`;

export const Section = styled.View`
  flex-direction: column;
  row-gap: 20px;
`;

export const SectionItem = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
`;

export const SectionIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const SectionIconWrapper = styled.View`
  padding: 4px;
  border-radius: 10px;
  background-color: ${colors.lightGray};
`;
