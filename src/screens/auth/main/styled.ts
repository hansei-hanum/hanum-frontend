import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const AuthMainScreenWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

export const AuthMainScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  row-gap: 40px;
`;

export const AuthMainScreenLogoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  flex: 1;
  padding-top: 80px;
`;

export const AuthMainScreenMainSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 12px;
  width: 100%;
  padding-bottom: 10px;
`;

export const AuthMainScreenTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AuthModalText = styled.Text<{ color?: string }>`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ color, theme }) => color || theme.default};
`;
