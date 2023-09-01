import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HanumPayContainer = styled.SafeAreaView`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HanumPayButtonContainer = styled(HanumPayContainer)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const HanumPayButton = styled.TouchableOpacity`
  width: 49%;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightGray};
  padding: 10px 0;
`;
