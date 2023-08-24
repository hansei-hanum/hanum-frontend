import styled from "@emotion/native";
import { colors, fonts } from "@hanum/styles";
import { TextInput } from "@react-native-material/core";

export const NameScreenContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
`;

export const NameScreenInput = styled(TextInput)`
    width: 100%;
    padding: 10px 0;
    margin-right: 20px;
    font-size: 16px;
    font-family: ${fonts.medium};
`;
