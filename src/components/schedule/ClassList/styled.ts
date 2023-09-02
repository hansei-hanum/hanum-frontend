import styled from '@emotion/native';

import { checkHeight, checkWidth, iosCheckHeight } from 'src/utils';

export const ClassListWrapper = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${iosCheckHeight ? '65px' : checkWidth ? '70px' : '62px'};
  height: ${iosCheckHeight ? '74px' : checkHeight ? '76px' : '52px'};
`;
