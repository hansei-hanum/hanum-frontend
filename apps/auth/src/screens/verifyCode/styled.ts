import styled from "@emotion/native";
import { colors } from "@hanum/styles";
import { TextInput } from "react-native-gesture-handler";

export const VerifyCodeScreenContainer = styled.View` 
    position: absolute;
     flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.primary};
`;


export const DummyContainer = styled.View`  
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
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

export const ModalAsdf = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
`;