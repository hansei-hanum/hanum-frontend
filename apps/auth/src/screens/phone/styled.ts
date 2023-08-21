import styled from "@emotion/native";
import { colors, fonts } from "@hanum/styles";
import { TextInput } from "@react-native-material/core";

export const PhoneScreenContainer = styled.View`    
    flex: 1;
    padding: 70px 20px 30px 20px;
    background-color: ${colors.white};
    justify-content: space-between;
`;

export const PhoneScreenInputContainer = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 30px;
`;

export const PhoneScreenInput = styled(TextInput)`
    width: 100%;
    padding: 10px 0;
    margin-right: 20px;
    font-size: 16px;
    font-family: ${fonts.medium};
`;

export const ButtonWrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;