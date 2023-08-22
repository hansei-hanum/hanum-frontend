import { Text } from "@hanum/components";
import { colors } from "@hanum/styles";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Auth } from "src/components/Auth";

export const VerifyCodeScreen: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    return (
        <Auth
            headerText={`인증 번호를 보냈어요!\n` + `받은 인증 번호를 입력해 주세요`}
            subHeaderText={
                <>
                    <Text size="16">문자가 안 오나요?</Text>
                    <TouchableOpacity activeOpacity={0.2}>
                        <Text size="16" color={colors.primary}>재전송 하기</Text>
                    </TouchableOpacity>
                </>
            }
            bottomText="인증하기"
            isDisabled={isDisabled}
            onPress={() => console.log('인증하기')}
        >
            <Text size="18">VerifyCode Screen</Text>
        </Auth>
    )
}