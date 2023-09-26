import styled from '@emotion/native';

import { colors } from 'src/styles';
import { isIos } from 'src/utils';

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
  height: ${isIos ? '820px' : '700px'};
  border: 1px solid ${colors.lightGray};
`;
