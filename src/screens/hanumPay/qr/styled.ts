import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HanumPayQRWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const HanumPayQRHeaderWrapper = styled.View`
  padding: 20px;
`;

export const HanumPayQRBoxContainer = styled.View`
  position: relative;
  bottom: 100px;
  row-gap: 10px;
`;


export const HanumPayQRBox = styled.View`
  width: 260px;
  height: 260px;
  border-color: white;
  border-width: 1px;
`;
