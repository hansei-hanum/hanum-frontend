import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  row-gap: 30px;
`;

export const EoullimBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
`;
