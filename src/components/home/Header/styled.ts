import { View } from 'react-native';

import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

import { checkHeight } from 'src/utils';

export const AndroidHeaderBlur = styled(View)`
  position: absolute;
  width: 100%;
  height: 70px;
`;

export const AndroidHeader = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: 60px;
  padding: 0 20px;
  padding-bottom: 6px;
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const IosBlurHeader = styled(BlurView)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  padding: 6px 20px;
  padding-top: ${checkHeight ? '60px' : '40px'};
  align-items: center;
  justify-content: space-between;
`;

export const IosHeader = styled.View`
  position: absolute;
  flex-direction: row;
  width: 100%;
  padding: 6px 20px;
  padding-top: ${checkHeight ? '60px' : '40px'};
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
`;
