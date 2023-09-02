import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

export const IosHeader = styled(BlurView)`
  position: absolute;
  flex-direction: column;
  z-index: 0;
  width: 100%;
  padding: 0px 20px;
  padding-top: 70px;
  padding-bottom: 10px;
  row-gap: 20px;
  align-items: flex-start;
`;

export const AndroidHeaderBlur = styled(BlurView)`
  position: absolute;
  width: 100%;
  height: 90px;
`;

export const AndroidHeader = styled.View`
  width: 100%;
  height: 90px;
  padding: 0 20px;
  padding-bottom: 10px;
  row-gap: 10px;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;
