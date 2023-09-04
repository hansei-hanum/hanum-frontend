import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

import { checkHeight } from 'src/utils';

export const IosHeader = styled(BlurView)`
  position: absolute;
  flex-direction: column;
  z-index: 0;
  width: 100%;
  padding: 0px 20px;
  padding-top: ${checkHeight ? '70px' : '40px'};
  padding-bottom: 10px;
  row-gap: ${checkHeight ? '20px' : '10px'};
  align-items: flex-start;
`;

export const AndroidHeaderBlur = styled(BlurView)`
  position: absolute;
  width: 100%;
  height: 110px;
`;

export const AndroidHeader = styled.View`
  width: 100%;
  height: 110px;
  padding: 0 20px;
  padding-bottom: 10px;
  row-gap: 10px;
  position: absolute;
  border: 1px solid transparent;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;
