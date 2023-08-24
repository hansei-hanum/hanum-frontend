import React from "react";
import * as S from "./styled"
import { Text } from "@hanum/components";

export const NameScreen: React.FC = () => {
    return (
        <S.NameScreenContainer>
            <Text size="16">NameScreen</Text>
        </S.NameScreenContainer>
    )
}