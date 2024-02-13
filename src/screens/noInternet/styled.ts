import styled from '@emotion/native';

import { isAndroid } from 'src/utils';

export const NoInternetWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const NoInternetTopSection = styled.View`
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${isAndroid ? `10px` : `0 10px`};
`;

export const NoInternetMainSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 14px;
  padding: 10px;
`;
