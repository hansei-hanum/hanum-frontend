import * as S from "./styled"

import { Button, Text } from "@hanum/components"
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TextInputProps } from "@react-native-material/core";
import { useRef, useState } from "react";

import { checkNumber } from "src/utils";
import { colors } from "@hanum/styles";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const PhoneScreen: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const navigation = useNavigation();

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
        <S.PhoneScreenContainer>
            <S.PhoneScreenInputContainer>
                <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
                    <Entypo
                        name="chevron-thin-left"
                        size={28}
                        color="black"
                        style={{ marginBottom: 10 }}
                    />
                </TouchableOpacity>
                <Text size='28' fontFamily='bold'>휴대폰 번호를 알려주세요</Text>
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
            </S.PhoneScreenInputContainer>
            <S.ButtonWrapper behavior="padding" keyboardVerticalOffset={15}>
                <Button isDisabled={isDisabled}>
                    다음
                </Button>
            </S.ButtonWrapper>
        </S.PhoneScreenContainer>
    )
}