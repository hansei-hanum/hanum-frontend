import React, { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

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
import { useBottomSheet, useGetMyPosts, useNavigate } from 'src/hooks';
import { communityEditAtom } from 'src/atoms';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

export interface OpenBottomSheetProps {
  postId: number | null;
  text: string;
  images: { uri: string; id: number }[];
}

export const UserPostScreen: React.FC = () => {
  const [scope, setScope] = useState<LimitedArticleScopeOfDisclosure>(
    LimitedArticleScopeOfDisclosure.Public,
  );

  const theme = useTheme();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetMyPosts({
    cursor: null,
  });

  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const { bottomSheetRef, closeBottomSheet } = useBottomSheet();

  const [height, setHeight] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);

  const navigate = useNavigate();

  const onChatScreenNavigate = (id: number) => {
    navigate('CommunityPostDetail', { id, isEdit: true });
  };

  const openBottomSheet = ({ postId, text, images }: OpenBottomSheetProps) => {
    setCommunityEdit({ text, images, id: postId });
    setPostId(postId);
    bottomSheetRef.current?.scrollTo(-height);
  };

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
          <Spinner size={40} isCenter />
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
                        id,
                        authorName,
                      },
                      index,
                    ) => (
                      <S.UserPostBox key={index}>
                        <CommunityPostHeader
                          authorName={authorName}
                          author={author}
                          scopeOfDisclosure={scopeOfDisclosure}
                          createdAt={createdAt}
                          style={{ width: '100%' }}
                          openBottomSheet={() =>
                            openBottomSheet({
                              postId: id,
                              text: content.spans ? content.spans[0].text : '',
                              images: attachments.map((item) => ({
                                uri: item.thumbnail,
                                id: item.id,
                              })),
                            })
                          }
                          onPress={() => onChatScreenNavigate(index)}
                        />
                        <CommunityPost
                          content={content}
                          attachments={attachments}
                          createdAt={createdAt}
                          onPress={() => onChatScreenNavigate(index)}
                          index={index}
                        />
                        <PostBottom id={id} reactions={reactions} commentCount={commentCount} />
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
        postId={postId}
        ref={bottomSheetRef}
        setHeight={setHeight}
        height={height}
        closeBottomSheet={closeBottomSheet}
      />
    </SafeAreaView>
  );
};
