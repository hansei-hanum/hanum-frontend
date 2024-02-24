import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { Text, AppLayout, CodeInput } from 'src/components';
import { useInitNavigate, useModal, useUserVerify } from 'src/hooks';
import { ConfirmModal } from 'src/components/auth/ConfirmModal';
import { isDisableAtom } from 'src/atoms';

import * as S from './styled';

export const VerifyScreen: React.FC = () => {
  const isDisabled = useRecoilValue(isDisableAtom);

  const { open, close } = useModal();
  const theme = useTheme();

  const [value, setValue] = useState('');

  const { mutate, isLoading } = useUserVerify();

  const { initNavigate } = useInitNavigate();

  const onCheckSubmit = () => {
    mutate({ code: value, isCheck: true });
    open();
  };

  const onSubmit = () => {
    mutate({ code: value, isCheck: false });
    close();
  };

  return (
    <>
      <AppLayout
        isDisabled={isDisabled}
        isLoading={isLoading}
        headerText={`정회원 인증 코드를\n` + `입력해주세요`}
        subHeaderText={
          <S.StudentVerifyTextContainer>
            <Text size={15} color={theme.placeholder}>
              아직 인증 코드가 없나요?
            </Text>
            <TouchableOpacity
              onPress={() => {
                initNavigate('Main');
              }}
              activeOpacity={0.5}
            >
              <Text size={15} color={theme.primary}>
                {' '}
                나중에 하기
              </Text>
            </TouchableOpacity>
          </S.StudentVerifyTextContainer>
        }
        bottomText="인증하기"
        onPress={onCheckSubmit}
      >
        <CodeInput value={value} setValue={setValue} isNumber={false} />
      </AppLayout>
      <ConfirmModal isLoading={isLoading} onSubmit={onSubmit} />
    </>
  );
};
