import { ColorSchemeName } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import styled from '@emotion/native';

export const ToastLayoutWrapper = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
`;

export const ToastLayoutBlurContainer = styled(BlurView)<{ systemTheme: ColorSchemeName }>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 14px;
  align-items: center;
  padding: 0 14px;
  column-gap: 10px;
  border-color: #efefef;
  border-width: ${({ systemTheme }) => (systemTheme === 'light' ? 1 : 0)};
`;

export const ToastLayoutIconWrapper = styled.View`
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  background-color: #4785fa;
  border-radius: 100px;
`;
