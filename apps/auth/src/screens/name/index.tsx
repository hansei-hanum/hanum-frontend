import * as S from "./styled"

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { checkString } from "src/utils";
import { colors } from "@hanum/styles";
import { Auth } from "src/components";

export const NameScreen: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const navigation = useNavigation();
    const navigate = navigation.navigate as (screen: string) => void;

    const onTextChange = (text: string) => {
        const newText = checkString(text);
        const nameRegex = /^[가-힣]{2,10}$/
        if (!nameRegex.test(newText)) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        setName(newText);
    }

    return (
        <Auth
            headerText="이름을 입력해주세요"
            bottomText="다음"
            onPress={() => navigate('Phone')}
            isDisabled={isDisabled}
        >
            <S.NameScreenInput
                onChangeText={onTextChange}
                value={name}
                variant="standard"
                label="이름"
                keyboardType="default"
                maxLength={10}
                color={colors.placeholder}
                inputContainerStyle={{ borderBottomColor: colors.placeholder }}
                inputStyle={{ fontSize: 20 }}
            />
        </Auth>
    )
}