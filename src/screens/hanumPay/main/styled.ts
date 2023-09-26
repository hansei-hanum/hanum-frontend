import styled from '@emotion/native';

import { colors } from 'src/styles';
import { isIos } from 'src/utils';

export const HanumPayWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const HanumPayContainer = styled.View`
  width: 100%;
  row-gap: 36;
  padding: 20px;
`;

export const HanumPaySection = styled.View`
  flex-direction: column;
  row-gap: 22px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const HanumUseAgeHistory = styled(HanumPaySection)`
  width: 100%;
  height: 100%;
  row-gap: ${isIos ? '16px' : '14px'};
`;

export const HanumUseAgeContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

export const HanumUseAgeDetails = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
