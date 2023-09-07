import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HanumPayQRWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const HanumPayQRHeaderWrapper = styled.View`
  padding: 16px;
`;

export const PrivacyTabContentContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
  padding: 20px;
  padding-top: 10px;
`;

export const PrivacyTabContentTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;

export const PrivacyTabContentWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  z-index: 90;
`;
