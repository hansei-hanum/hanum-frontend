import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, ScreenHeader, Spinner, Text } from 'src/components';
import { useGetBlockList, useReleaseBlock } from 'src/hooks';
import { UserLogo } from 'src/assets';

import * as S from './styled';

export const UserBlockListScreen: React.FC = () => {
  const theme = useTheme();

  const { mutate, isLoading } = useReleaseBlock();

  const { data, refetch } = useGetBlockList();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="차단된 사용자" />
      {isLoading ? (
        <Spinner isCenter />
      ) : Boolean(!data?.data.blocks.length) ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text size={16} color={theme.placeholder}>
            차단된 사용자가 없어요.
          </Text>
        </View>
      ) : (
        <S.BlockListContainer>
          {data?.data.blocks.map(({ picture, name, handle, id, verificationInfo }) => (
            <S.BlockListBox key={id}>
              <S.BlockListUserContainer>
                <S.BlockListUserImage
                  resizeMode="contain"
                  source={picture ? { uri: picture } : UserLogo}
                />
                <S.BlockListUserInfoContainer>
                  <Text size={16} fontFamily="bold">
                    {handle ? handle : '핸들임'}
                    <Text size={14} color={theme.placeholder}>
                      {' '}
                      ({name})
                    </Text>
                  </Text>
                  <Text size={14}>{verificationInfo}</Text>
                </S.BlockListUserInfoContainer>
              </S.BlockListUserContainer>
              <ScaleOpacity onPress={() => mutate({ targetId: id })}>
                <S.BlockListCancelButton>
                  {!isLoading ? (
                    <Text size={14} fontFamily="bold">
                      차단 해제
                    </Text>
                  ) : (
                    <Spinner size={14} />
                  )}
                </S.BlockListCancelButton>
              </ScaleOpacity>
            </S.BlockListBox>
          ))}
        </S.BlockListContainer>
      )}
    </SafeAreaView>
  );
};
