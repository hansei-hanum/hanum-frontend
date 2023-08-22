import styled from "@emotion/native";
import { colors, fonts } from "@hanum/styles";
import { TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export const AuthContainer = styled.View`    
    flex: 1;
    padding: 70px 20px 30px 20px;
    background-color: ${colors.white};
    justify-content: space-between;
`;

export const AuthInputContainer = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 20px;
    border: 1px solid red;
`;

export const AuthTextContainer = styled.View`
    flex-direction: column;
    /* row-gap: 6px; */
    border: 1px solid blue;
`;

export const AuthInput = styled(TextInput)`
    width: 100%;
    padding: 10px 0;
    margin-right: 20px;
    font-size: 16px;
    font-family: ${fonts.medium};
`;

export const AuthButtonWrapper = styled(Platform.OS == 'ios' ? KeyboardAvoidingView : View)`
    width: 100%;
    justify-content: center;
    align-items: center;
`;