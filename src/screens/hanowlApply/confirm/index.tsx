import React from 'react';
import { SafeAreaView } from 'react-native';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { AppLayoutWithoutButton, ConfirmBox, GoBackIcon, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';
import { useNavigate } from 'src/hooks';
import { hanowlApplyAtom } from 'src/atoms';

import * as S from './styled';
export const ConfirmScreen: React.FC = () => {
  const setHanowlApply = useSetRecoilState(hanowlApplyAtom);

  const navigate = useNavigate();

  const theme = useTheme();

  const onPress = () => {
    setHanowlApply({
      team: '',
      introduce: '',
      motive: '',
      aspiration: '',
    });
    navigate('SelectTeam');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <S.ConfirmContainer>
        <GoBackIcon />
        <AppLayoutWithoutButton
          headerText={`임시저장된 지원서가 있네요.\n이어서 쓸까요?`}
          subHeaderText={
            <Text size={14}>
              지원서를 처음부터 다시 쓰고 싶나요?{' '}
              <Text size={14} color={theme.primary} onPress={onPress}>
                새로 쓰기
              </Text>
            </Text>
          }
        >
          <S.ConfirmList contentContainerStyle={{ rowGap: 20, marginTop: 30 }}>
            {HANOWL_APPLY.CONFIRM_DUMMY_LIST.map((props) => (
              <ConfirmBox {...props} />
            ))}
          </S.ConfirmList>
        </AppLayoutWithoutButton>
      </S.ConfirmContainer>
    </SafeAreaView>
  );
};
