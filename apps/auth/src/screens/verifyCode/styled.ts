import styled from "@emotion/native";
import { colors } from "@hanum/styles";
import { TextInput } from "react-native";

export const VerifyCodeScreenContainer = styled.View` 
    position: absolute;
     flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.primary};
`;

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
