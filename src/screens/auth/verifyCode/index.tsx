import React, { useState } from 'react';
import { View } from 'react-native';

import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { AppLayout, CodeInput, Text } from 'src/components';
import { authAtom, isDisableAtom } from 'src/atoms';
import { useAuth } from 'src/hooks';

export const VerifyCodeScreen: React.FC = () => {
  const isDisabled = useRecoilValue(isDisableAtom);

  const theme = useTheme();

  const [value, setValue] = useState('');
  const auth = useRecoilValue(authAtom);
  const { mutate: mutateAuth, isLoading } = useAuth();

  const onSubmit = () => {
    mutateAuth({ ...auth, code: value });
  };

  return (
    <AppLayout
      isLoading={isLoading}
      headerText={`인증번호를 보냈어요!\n받은 인증번호를 입력해 주세요`}
      bottomText="인증하기"
      onPress={onSubmit}
      isDisabled={isDisabled}
    >
      <View style={{ flexDirection: 'column', rowGap: 10 }}>
        <CodeInput value={value} setValue={setValue} isNumber={true} />
        {auth.errorMessage && (
          <Text size={15} color={theme.danger}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </AppLayout>
  );
};
