import { Text } from "@hanum/components";
import React from "react";
import * as S from "./styled"

export const HomeScreen: React.FC = () => {
    return (
        <S.HomeScreenContainer>
            <Text size="16">Home Screen</Text>
        </S.HomeScreenContainer>
    )
}