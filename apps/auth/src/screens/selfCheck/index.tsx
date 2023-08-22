import { Button, DummyContainer, Modal, Text } from "@hanum/components";
import React, { useState, useEffect } from "react";
import { Auth } from "src/components";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as S from "./styled"
import { checkNumber } from "src/utils";

const CELL_COUNT = 6;

export const SelfCheckScreen: React.FC = () => {
    const [value, setValue] = useState('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onChangeText = (text: string) => {
        const newText = checkNumber(text);
        const codeValidationRegex = /^\d{6}$/;
        codeValidationRegex.test(newText) ? setIsDisabled(false) : setIsDisabled(true);
        setValue(newText);
    };

    return (
        <>
            {modalVisible && <DummyContainer />}
            <Auth
                headerText={`반가워요!\n` + `먼저 인증 코드를 확인할게요`}
                bottomText="인증하기"
                isDisabled={isDisabled}
                onPress={() => { console.log('인증번호 보냄') }}
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
                        <S.SelfCheckScreenInput key={index} onLayout={getCellOnLayoutHandler(index)}>
                            <Text size="20" fontFamily="medium">
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </S.SelfCheckScreenInput>
                    )}
                />
            </Auth >
            <Modal
                title="인증 시간 초과"
                text={`인증번호를 입력할 수 있는 시간이 지났어요.\n` + `처음부터 다시 시도해 주세요.`}
                modalVisible={modalVisible}
                button={<Button onPress={() => setModalVisible(false)}>확인</Button>}
            />
        </>
    )
}
