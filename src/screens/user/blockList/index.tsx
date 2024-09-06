import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, ScreenHeader, Spinner, Text } from 'src/components';
import { useGetBlockList, useReleaseBlock } from 'src/hooks';
import { UserLogo } from 'src/assets';

import * as S from './styled';

export const UserBlockListScreen: React.FC = () => {
  const theme = useTheme();

  const { mutate } = useReleaseBlock();

  const { data, refetch, isLoading: getBlockList } = useGetBlockList();

  const isFocused = useIsFocused();

  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const handleReleaseBlock = (id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    mutate({ targetId: id });
    setTimeout(() => {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }, 500);
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="차단된 사용자" />
      {getBlockList ? (
        <Spinner isCenter />
      ) : data?.pages && data?.pages[0].data.items.length <= 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text size={16} color={theme.placeholder}>
            차단된 사용자가 없어요.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.pages}
          keyExtractor={(index) => index.toString()}
          contentContainerStyle={{
            width: '100%',
            paddingTop: 20,
          }}
          renderItem={({ item: { data } }) => (
            <View style={{ rowGap: 24, flexDirection: 'column', padding: 14 }}>
              {data.items.map(({ picture, name, id, verificationInfo }) => (
                <S.BlockListBox key={id}>
                  <S.BlockListUserContainer>
                    <S.BlockListUserImage
                      resizeMode="contain"
                      source={picture ? { uri: picture } : UserLogo}
                    />
                    <S.BlockListUserInfoContainer>
                      <Text size={16} fontFamily="bold">
                        {name}
                      </Text>
                      <Text size={14}>{verificationInfo}</Text>
                    </S.BlockListUserInfoContainer>
                  </S.BlockListUserContainer>
                  <ScaleOpacity onPress={() => handleReleaseBlock(id)}>
                    <S.BlockListCancelButton>
                      {!loadingIds.includes(id) ? (
                        <Text size={14} fontFamily="bold" color={theme.white} isCenter>
                          차단 해제
                        </Text>
                      ) : (
                        <Spinner size={14} />
                      )}
                    </S.BlockListCancelButton>
                  </ScaleOpacity>
                </S.BlockListBox>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
