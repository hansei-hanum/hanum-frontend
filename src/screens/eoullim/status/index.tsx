import React from "react";
import { Status, Text } from "src/components";
import * as S from "./styled"
import { colors } from "src/styles";
import { useGetUser } from "src/hooks";

export const EoullimStatusScreen: React.FC = () => {
    const {userData} = useGetUser();
return(
    <Status navigateUrl='Main'>
        <S.StatusRaffleWrapper>
            <Text size={40} fontFamily="bold" isCenter color={colors.white}>
                76
            </Text>
        </S.StatusRaffleWrapper>
        <Text size={22}  fontFamily="bold" isCenter>
            {userData.name}의 추첨번호는 {'\n'} "76"번 입니다.
        </Text>
    </Status>
)
}