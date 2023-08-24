import { WithLocalSvg } from 'react-native-svg';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const MainScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.white};
  padding: 0 20px;
  row-gap: 40px;
`;

export const MainScreenLogoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

export const MainScreenMainSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  width: 100%;
`;

export const MainScreenTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MainScreenButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
