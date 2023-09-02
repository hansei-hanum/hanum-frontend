import { Platform } from 'react-native';

import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

export const AndroidHeaderBlur = styled(BlurView)`
  position: absolute;
  width: 100%;
  height: 70px;
`;

export const AndroidHeader = styled.View`
  width: 100%;
  height: 70px;
  padding: 0 20px;
  padding-bottom: 6px;
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const IosHeader = styled(BlurView)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  padding: 12px 20px;
  padding-top: ${Platform.OS === 'ios' ? '60px' : '30px'};
  align-items: center;
  justify-content: space-between;
`;
