import styled from '@emotion/native';

import { colors } from 'src/styles';
import { isIos } from 'src/utils';

export const HanumPayQRBoxWrapper = styled.View`
  flex: 1;
  background-color: ${colors.black};
  justify-content: center;
  align-items: center;
`;

export const HanumPayQRBoxContainer = styled.View`
  position: relative;
  bottom: ${isIos ? '10px' : '36px'};
  row-gap: 10px;
`;

export const HanumPayQrBox = styled.View`
  flex-direction: column;
  justify-content: space-between;
  row-gap: 90px;
  width: 200px;
  height: 200px;
`;

export const HanumPayQrBoxContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HanumPayQRBoxLeftTop = styled.View`
  width: 30px;
  height: 30px;
  border-color: white;
  border-left-width: 5px;
  border-top-width: 5px;
`;

export const HanumPayQRBoxRightTop = styled.View`
  width: 30px;
  height: 30px;
  border-color: white;
  border-right-width: 5px;
  border-top-width: 5px;
`;

export const HanumPayQRBoxLeftBottom = styled.View`
  width: 30px;
  height: 30px;
  border-color: white;
  border-left-width: 5px;
  border-bottom-width: 5px;
`;

export const HanumPayQRBoxRightBottom = styled.View`
  width: 30px;
  height: 30px;
  border-color: white;
  border-right-width: 5px;
  border-bottom-width: 5px;
`;
