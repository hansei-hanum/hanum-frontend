import { Text } from "@hanum/components";
import { colors } from "@hanum/styles";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Auth } from "src/components/Auth";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as S from "./styled"
import { checkNumber } from "src/utils";

const CELL_COUNT = 6;

export const VerifyCodeScreen: React.FC = () => {
    const [value, setValue] = useState('');
    const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const onChangeText = (text: string) => {
        const newText = checkNumber(text);
        const codeValidationRegex = /^\d{6}$/;
        codeValidationRegex.test(newText) ? setIsDisabled(false) : setIsDisabled(true);
        setValue(newText);
    };

    return (
        <Auth
            headerText={`인증 번호를 보냈어요!\n` + `받은 인증 번호를 입력해 주세요`}
            subHeaderText={
                <S.VerifyCodeScreenTextContainer>
                    <Text size="16">문자가 안 오나요?</Text>
                    <TouchableOpacity activeOpacity={0.2}>
                        <Text size="16" color={colors.primary}> 재전송 하기</Text>
                    </TouchableOpacity>
                </S.VerifyCodeScreenTextContainer>
            }
            bottomText="인증하기"
            isDisabled={isDisabled}
            onPress={() => console.log('인증하기')}
        >
            <CodeField
                ref={codeFieldRef}
                {...props}
                value={value}
                onChangeText={onChangeText}
                cellCount={CELL_COUNT}
                caretHidden={true}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                rootStyle={{
                    width: '100%',
                }}
                renderCell={({ index, symbol, isFocused }) => (
                    <S.VerifyCodeScreenInput key={index} onLayout={getCellOnLayoutHandler(index)}>
                        <Text size="20" fontFamily="medium">
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </S.VerifyCodeScreenInput>
                )}
            />
        </Auth>
    )
}