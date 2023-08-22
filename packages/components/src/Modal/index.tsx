import React from "react";

import * as S from "./styled";
import { Modal as ModalElement } from "react-native";
import { Text } from "../Text";

export interface ModalProps {
    title: string;
    text: string;
    button: React.ReactNode;
    modalVisible: boolean;
}

export const Modal: React.FC<ModalProps> = ({ title, text, button, modalVisible }) => {
    return (
        <>
            <ModalElement
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <S.ModalWrapper >
                    <S.ModalContainer>
                        <Text size="24" fontFamily='bold'>{title}</Text>
                        <Text size="16">{text.split('\n').map((line, index) => (
                            <>
                                {line}{index !== text.split('\n').length - 1 && <>{'\n'}</>}
                            </>
                        ))}
                        </Text>
                        {button}
                    </S.ModalContainer>
                </S.ModalWrapper>
            </ModalElement>
        </>
    )
}