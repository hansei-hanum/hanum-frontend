import { TextInput } from 'react-native';

import styled from '@emotion/native';

export const VerifyCodeScreenTextContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
`;

export const VerifyCodeScreenInput = styled(TextInput)`
  width: 47px;
  height: 67px;
  padding: 0px 16px;
  border-radius: 12px;
  font-size: 20px;
  background-color: #f4f4f5;
  margin-top: 20px;
`;
