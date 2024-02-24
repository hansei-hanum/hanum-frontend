import styled from '@emotion/native';

import { iosCheckHeight, isAndroid } from 'src/utils';

export const ConfirmContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-start;
  row-gap: 20px;
  padding: 0 20px;
  margin-top: ${iosCheckHeight ? '10px' : isAndroid ? '25px' : '20px'};
  margin-bottom: ${iosCheckHeight ? '5px' : isAndroid ? '15px' : '14px'};
`;

export const ConfirmList = styled.ScrollView`
  width: 100%;
`;
