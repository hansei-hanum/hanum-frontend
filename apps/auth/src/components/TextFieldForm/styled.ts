import styled from "@emotion/native";
import { fonts } from "@hanum/styles";
import { TextInput } from "@react-native-material/core";

export const TextFieldFormInput = styled(TextInput)`
    width: 100%;
    padding: 10px 0;
    margin-right: 20px;
    font-size: 16px;
    font-family: ${fonts.medium};
`;
