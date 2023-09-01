import styled from '@emotion/native';

import { colors } from 'src/styles';

export const AuthMainScreenContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.white};
  padding: 0 20px;
  row-gap: 40px;
`;

export const AuthMainScreenLogoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

export const AuthMainScreenMainSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  width: 100%;
`;

export const AuthMainScreenTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AuthMainScreenButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
