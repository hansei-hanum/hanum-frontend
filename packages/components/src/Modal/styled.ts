import styled from "@emotion/native";
import { colors } from "@hanum/styles";


export const ModalWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;


export const ModalContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 90%;
    border-radius: 16px;
    background-color: ${colors.white};
    padding: 20px 0;
    row-gap: 20px;
`;

export const DummyContainer = styled.View`  
flex: 1;
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;