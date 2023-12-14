import { Animated } from 'react-native';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const AnonymitySettingsWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding: 14px;
`;

export const AnonymitySettingsContainer = styled.View`
  row-gap: 20;
  margin-top: 14px;
`;

export const AnonymitySettingsListContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AnonymitySettingsList = styled(AnonymitySettingsListContainer)`
  width: auto;
  column-gap: 10px;
  justify-content: center;
`;

export const AnonymityNicknameWrapper = styled(Animated.View)`
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
  row-gap: 14px;
  padding: ${isIos ? '14px' : '2px'};
  border-radius: 8px;
`;
