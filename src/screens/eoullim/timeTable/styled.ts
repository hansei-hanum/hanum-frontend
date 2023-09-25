import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimTimeTableWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const EoullimTimeTableContainer = styled.ImageBackground`
  flex: 1;
  margin: 20px 0;
  border: 1px solid ${colors.lightGray};
`;
