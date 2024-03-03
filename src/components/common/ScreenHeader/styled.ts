import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const ScreenHeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  padding-top: ${isIos ? 0 : '14px'};
  background-color: ${({ theme }) => theme.background};
  z-index: 9999;
`;
