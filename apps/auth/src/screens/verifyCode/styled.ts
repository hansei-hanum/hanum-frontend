import styled from "@emotion/native";
import { TextInput } from "react-native-gesture-handler";

export const VerifyCodeScreenTextContainer = styled.View` 
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
