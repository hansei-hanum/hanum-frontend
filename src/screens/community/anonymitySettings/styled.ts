import { Animated } from 'react-native';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const AnonymitySettingsContainer = styled.View`
  row-gap: 20;
  margin-top: 14px;
`;

export const AnonymityNicknameWrapper = styled(Animated.View)`
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
  row-gap: 14px;
  padding: ${isIos ? '0px' : '2px'};
  border-radius: 8px;
`;
