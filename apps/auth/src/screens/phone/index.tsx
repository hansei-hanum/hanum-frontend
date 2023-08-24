import * as S from "./styled"

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { checkNumber } from "src/utils";
import { colors } from "@hanum/styles";
import { Auth } from "src/components";

export const PhoneScreen: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const navigation = useNavigation();
    const navigate = navigation.navigate as (screen: string) => void;

    const onPhoneChange = (phone: string) => {
        console.log(phone);
        const newPhone = checkNumber(phone);
        const phoneRegex = /^010-?\d{4}-?\d{4}$/
        if (!phoneRegex.test(newPhone)) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        setPhone(newPhone);
    }

    return (
        <Auth
            headerText="휴대폰 번호를 알려주세요"
            bottomText="다음"
            onPress={() => navigate('VerifyCode')}
            isDisabled={isDisabled}
        >
            <S.PhoneScreenInput
                onChangeText={onPhoneChange}
                value={phone}
                variant="standard"
                label="휴대폰 번호"
                keyboardType="numeric"
                maxLength={11}
                color={colors.placeholder}
                inputContainerStyle={{ borderBottomColor: colors.placeholder }}
                inputStyle={{ fontSize: 20 }}
            />
        </Auth>
    )
}