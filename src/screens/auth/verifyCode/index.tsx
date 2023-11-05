import React, { useState } from 'react';
import { View } from 'react-native';

import { useRecoilState, useRecoilValue } from 'recoil';

import { colors } from 'src/styles';
import { Auth, CodeInput, Text } from 'src/components';
import { authAtom, disableAtom } from 'src/atoms';
import { useAuth } from 'src/hooks';

export const VerifyCodeScreen: React.FC = () => {
  const [disabled, setDisabled] = useRecoilState(disableAtom);

  const [value, setValue] = useState('');
  const auth = useRecoilValue(authAtom);
  const { mutate: mutateAuth, isLoading } = useAuth();

  const onSubmit = () => {
    mutateAuth({ ...auth, code: value });
  };

  return (
    <Auth
      isLoading={isLoading}
      headerText={`인증번호를 보냈어요!\n받은 인증번호를 입력해 주세요`}
      bottomText="인증하기"
      isDisabled={disabled}
      onPress={onSubmit}
    >
      <View style={{ flexDirection: 'column', rowGap: 10 }}>
        <CodeInput value={value} setValue={setValue} isNumber={true} setIsDisabled={setDisabled} />
        {auth.errorMessage && (
          <Text size={15} color={colors.danger}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </Auth>
  );
};
