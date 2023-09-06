import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HanumPayWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const HanumPayContainer = styled.View`
  flex: 1;
  padding: 20px;
  flex-direction: column;
  row-gap: 36px;
`;

export const HanumPaySection = styled.View`
  flex-direction: column;
  row-gap: 22px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const HanumUsageHistory = styled(HanumPaySection)`
  row-gap: 16px;
`;

export const HanumUsageDetails = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
