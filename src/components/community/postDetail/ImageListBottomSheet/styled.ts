import { Animated } from 'react-native';
import ReAnimated from 'react-native-reanimated';

import styled from '@emotion/native';

import { SCREEN_HEIGHT } from 'src/constants';

export const ImageListBottomSheetContainer = styled(ReAnimated.View)`
  height: ${`${SCREEN_HEIGHT}px`};
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  position: absolute;
  top: ${`${SCREEN_HEIGHT}px`};
  border-radius: 25px;
  z-index: 9999;
`;

export const ImageListBottomSheetLine = styled.View`
  width: 75px;
  height: 4px;
  background-color: ${({ theme }) => theme.placeholder};
  align-self: center;
  margin: 15px 0;
  border-radius: 2px;
`;

export const ImageWrapper = styled.View`
  width: 33.3%;
  position: relative;
`;

export const Image = styled.Image`
  height: 140px;
  width: 100%;
`;

export const ImageListBottomSheetButtonWrapper = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 14px;
  z-index: 9999;
`;

export const IconWrapper = styled.View`
  position: absolute;
  margin-top: 6px;
  margin-right: 6px;
  top: 0;
  right: 0;
  z-index: 99;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50px;
`;

export const WarningContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.modalBg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
`;

export const PermissionDeninedContainer = styled.View`
  width: 100%;
  height: 30%;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
`;
