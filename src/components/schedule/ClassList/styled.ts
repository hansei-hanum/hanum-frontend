import styled from '@emotion/native';

import { checkHeight, checkWidth } from 'src/utils';

export const ClassListWrapper = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${checkWidth ? '70px' : '62px'};
  height: ${checkHeight ? '76px' : '52px'};
`;
