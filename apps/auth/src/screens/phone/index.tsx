import * as S from "./styled"

import { Button, Text } from "@hanum/components"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

import { checkNumber } from "src/utils";

export const PhoneScreen: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const phoneRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const inputFocusOut = () => {
        phoneRef.current?.blur();
    }

    const onPhoneChange = (phone: string) => {
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
        <S.PhoneScreenContainer activeOpacity={1} onPress={inputFocusOut}>
            <S.PhoneScreenInputContainer>
                <AntDesign name="left" size={32} color="black" onPress={() => navigation.goBack()} />
                <Text size='28' fontFamily='bold'>휴대폰 번호를 알려 주세요</Text>
                <S.PhoneScreenInput
                    isDisabled={isDisabled}
                    onChangeText={onPhoneChange}
                    ref={phoneRef}
                    value={phone}
                    placeholder="휴대폰 번호"
                    keyboardType="numeric"
                    maxLength={11}
                />
            </S.PhoneScreenInputContainer>
            <Button isDisabled={isDisabled}>
                다음
            </Button>
        </S.PhoneScreenContainer>
    )
}