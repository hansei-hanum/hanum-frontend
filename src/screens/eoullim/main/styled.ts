import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  padding-top: 50px;
  row-gap: 30px;
`;

export const EoullimBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
