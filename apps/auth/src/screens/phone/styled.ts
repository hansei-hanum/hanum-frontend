import styled from "@emotion/native";
import { colors, fonts } from "@hanum/styles";

export const PhoneScreenContainer = styled.TouchableOpacity`    
    flex: 1;
    padding: 70px 0 30px 20px;
    background-color: ${colors.white};
    justify-content: space-between;
`;

export const PhoneScreenInputContainer = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 30px;
`;

export const PhoneScreenInput = styled.TextInput<{ isDisabled: boolean }>`
    width: 95%;
    padding: 10px 0;
    margin-right: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ isDisabled }) => isDisabled ? colors.danger : colors.secondary};
    font-size: 16px;
    font-family: ${fonts.medium};
    &::placeholder {
        color: ${colors.black};
    }
`;