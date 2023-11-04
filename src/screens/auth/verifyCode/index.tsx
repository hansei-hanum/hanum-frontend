import React, { useState } from 'react';
import { View } from 'react-native';

import { useRecoilValue } from 'recoil';

import { isAndroid } from 'src/utils';
import { colors } from 'src/styles';
import { Auth, CodeInput, Text } from 'src/components';
import { authAtom } from 'src/atoms';
import { useAuth } from 'src/hooks';

export const VerifyCodeScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const auth = useRecoilValue(authAtom);
  const { mutate: mutateAuth } = useAuth();

  const onSubmit = () => {
    mutateAuth({ ...auth, code: value });
  };

  return (
    <Auth
      headerText={`인증번호를 보냈어요!\n받은 인증번호를 입력해 주세요`}
      bottomText="인증하기"
      isDisabled={isDisabled}
      onPress={onSubmit}
    >
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 10 : 0 }}>
        <CodeInput
          value={value}
          setValue={setValue}
          isNumber={true}
          setIsDisabled={setIsDisabled}
        />
        {auth.errorMessage && (
          <Text size={15} color={colors.danger}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </Auth>
  );
};
