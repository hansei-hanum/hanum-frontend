import styled from '@emotion/native';

import { RPH, RPW, checkWidth, isAndroid } from 'src/utils';

export const ClassListWrapper = styled.View`
  width: ${`${RPW(17)}px`};
  height: ${`${RPH(9)}px`};
  text-align: center;
  padding-right: ${isAndroid && checkWidth ? '10px' : '2px'};
`;
