import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimTimeTableWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
  padding-bottom: 0;
`;

export const EoullimTimeTableContainer = styled.ScrollView`
  flex: 1;
`;

export const EoullimTimeTableImage = styled.ImageBackground`
  height: 580px;
  border: 1px solid ${colors.lightGray};
`;
