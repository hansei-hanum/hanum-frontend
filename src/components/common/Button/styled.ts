import { TouchableOpacity } from 'react-native';

import styled from '@emotion/native';

export const ButtonElement = styled(TouchableOpacity)`
  padding: 14px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 6;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
