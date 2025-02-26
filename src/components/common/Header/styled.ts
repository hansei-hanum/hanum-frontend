import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const HeaderContainer = styled.View`
  width: 100%;
  padding: ${isIos ? '10px' : '20px'} 20px;
  row-gap: 10px;
  background-color: transparent;
  z-index: 10;
`;

export const HeaderIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;
