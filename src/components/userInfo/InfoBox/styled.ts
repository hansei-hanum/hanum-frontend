import styled from '@emotion/native';

import { iosCheckHeight } from 'src/utils';

export const InfoBoxContainer = styled.View`
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${iosCheckHeight ? '30px' : '15px'};
`;

export const InfoBoxItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
