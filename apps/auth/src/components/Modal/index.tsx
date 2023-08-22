import React, { useState } from "react";

import * as S from "./styled";
import { Text } from "@hanum/components";
import { Pressable } from "react-native";
import { Modal as ModalElement } from "react-native";
import { colors } from "@hanum/styles";

export const Modal: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <S.ModalWrapper>
            <ModalElement
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <S.ModalContainer>
                    <Text size="16" color={colors.white}>Modal</Text>
                    <Pressable
                        style={{ marginTop: 60 }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text size="16" color={colors.white}>Hide Modal</Text>
                    </Pressable>
                </S.ModalContainer>
            </ModalElement>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text size="16">Show Modal</Text>
            </Pressable>
        </S.ModalWrapper>
    )
}