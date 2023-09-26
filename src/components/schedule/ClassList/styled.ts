import styled from '@emotion/native';

import { checkHeight, checkWidth, iosCheckHeight, isAndroid } from 'src/utils';

export const ClassListWrapper = styled.View`
  width: ${iosCheckHeight ? '65px' : checkWidth ? '70px' : '62px'};
  height: ${iosCheckHeight ? '80px' : checkHeight ? '82px' : '56px'};
  text-align: center;
  padding-right: ${isAndroid && checkWidth ? '10px' : '2px'};
`;
