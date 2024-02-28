import LinearGradient from 'react-native-linear-gradient';

import styled from '@emotion/native';

export const HanowlApplyMainDummyContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: ${({ theme }) => theme.black};
`;

export const HanowlApplyButtonWrapper = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  padding: 20px;
  padding-bottom: 30px;
  padding-top: 60px;
  z-index: 999;
  width: 100%;
`;
