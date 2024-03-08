import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { COMMUNITY_LIST } from 'src/constants';
import {
  CommunityMineBottomSheet,
  CommunityPost,
  CommunityPostHeader,
  PostBottom,
  PostsTopSection,
  ScreenHeader,
  Spinner,
  Text,
} from 'src/components';
import { useBottomSheet, useGetImagesHeight, useGetMyPosts, useNavigate } from 'src/hooks';
import { communityEditAtom } from 'src/atoms';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

export const UserPostScreen: React.FC = () => {
  const [scope, setScope] = useState<LimitedArticleScopeOfDisclosure>(
    LimitedArticleScopeOfDisclosure.Public,
  );
  const theme = useTheme();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetMyPosts({
    scope,
    cursor: null,
  });

  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const { bottomSheetRef, closeBottomSheet } = useBottomSheet();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const [height, setHeight] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index, isEdit: true });
  };

  const openBottomSheet = (text: string, image: string[]) => {
    bottomSheetRef.current?.scrollTo(-height);
    setCommunityEdit({ text, image });
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCommunityEdit((prev) => ({ ...prev, isEdit: true }));
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="내 게시물"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isScrolled ? theme.lightGray : 'transparent',
        }}
      />
      <S.UserPostWrapper>
        {isLoading ? (
          <>
            <PostsTopSection withUserThinkBox={false} postScope={scope} setPostScope={setScope} />
            <Spinner size={40} isCenter />
          </>
        ) : (
          data &&
          (data.pages[0].data.items.length > 0 ? (
            <FlatList
              scrollEventThrottle={16}
              data={data.pages}
              onScroll={(e) => setIsScrolled(e.nativeEvent.contentOffset.y > 0)}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={() => fetchNextPage()}
              onEndReachedThreshold={0.5}
              ListHeaderComponent={
                <PostsTopSection
                  withUserThinkBox={false}
                  postScope={scope}
                  setPostScope={setScope}
                />
              }
              contentContainerStyle={{
                paddingBottom: 60,
                rowGap: 40,
              }}
              renderItem={({ item: { data } }) => (
                <View style={{ rowGap: 60 }}>
                  {data.items.map(
                    (
                      {
                        author,
                        scopeOfDisclosure,
                        createdAt,
                        content,
                        attachments,
                        commentCount,
                        reactions,
                      },
                      index,
                    ) => (
                      <S.UserPostBox key={index}>
                        <CommunityPostHeader
                          author={author}
                          scopeOfDisclosure={scopeOfDisclosure}
                          createdAt={createdAt}
                          style={{ width: '100%' }}
                          openBottomSheet={() => bottomSheetRef.current?.scrollTo(-height)}
                          onPress={() => onChatScreenNavigate(index)}
                        />
                        <CommunityPost
                          content={content}
                          attachments={attachments}
                          createdAt={createdAt}
                          onPress={() => onChatScreenNavigate(index)}
                          index={index}
                          imageHeights={imageHeights}
                        />
                        <PostBottom
                          index={index}
                          likesLength={reactions
                            ?.map(({ count }) => count)
                            .reduce((acc, cur) => acc + cur, 0)}
                          commentCount={commentCount}
                        />
                      </S.UserPostBox>
                    ),
                  )}
                  {isFetchingNextPage && (
                    <View style={{ paddingVertical: 20 }}>
                      <Spinner size={40} />
                    </View>
                  )}
                </View>
              )}
            />
          ) : (
            <>
              <PostsTopSection withUserThinkBox={false} postScope={scope} setPostScope={setScope} />
              <S.CommunityMainNoDataWrapper>
                <Text size={16} color={theme.placeholder} isCenter>
                  이 메뉴에는 아직 작성된 글이 없어요
                </Text>
              </S.CommunityMainNoDataWrapper>
            </>
          ))
        )}
      </S.UserPostWrapper>
      <CommunityMineBottomSheet
        ref={bottomSheetRef}
        setHeight={setHeight}
        height={height}
        closeBottomSheet={closeBottomSheet}
      />
    </SafeAreaView>
  );
};
