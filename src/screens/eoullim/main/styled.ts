import styled from '@emotion/native';

import { colors } from 'src/styles';
import { isIos } from 'src/utils';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  padding-top: ${isIos ? '50px' : '20px'};
  row-gap: 30px;
`;

export const EoullimBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
