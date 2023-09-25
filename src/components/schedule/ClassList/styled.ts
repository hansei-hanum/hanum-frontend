import styled from '@emotion/native';

import { checkHeight, checkWidth, iosCheckHeight, isAndroid } from 'src/utils';

export const ClassListWrapper = styled.View`
  width: ${iosCheckHeight ? '65px' : checkWidth ? '70px' : '62px'};
  height: ${iosCheckHeight ? '74px' : checkHeight ? '76px' : '56px'};
  text-align: center;
  padding-right: ${isAndroid ? '10px' : '0px'};
`;
