import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollViewProps, View } from 'react-native';
import { InfiniteData } from 'react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import {
  APIResponse,
  GetCommentsAuthorProps,
  GetMyPostsResponse,
  GetPostsResponse,
  SearchPostsResponse,
} from 'src/api';
import { Spinner, Text } from 'src/components/common';
import { isIos } from 'src/utils';
import { HeaderOptionProps } from 'src/screens';
import { useBottomSheet, useGetUser, useNavigate } from 'src/hooks';
import { communityEditAtom } from 'src/atoms';
import { BottomSheetRefProps } from 'src/types';
import { COMMUNITY_BOTTOM_SHEET_HEIGHT } from 'src/constants';

import { PostsTopSection } from '../PostsTopSection';
import { CommunityPostHeader } from '../PostHeader';
import { CommunityPost } from '../Post';
import { PostBottom } from '../main';
import { CommunityMineBottomSheet } from '../MineBottomSheet';
import { PostOptionBottomSheet } from '../PostOptionBottomSheet';

import * as S from './styled';

export interface PostDataLayoutCustomProps {
  /**
   * 게시물 데이터 || 검색 데이터 || 내 게시물 데이터의 페지네이션 데이터를 가져옵니다.
   */
  data?:
    | InfiniteData<APIResponse<GetPostsResponse>>
    | InfiniteData<APIResponse<SearchPostsResponse>>
    | InfiniteData<APIResponse<GetMyPostsResponse>>;
  /**
   * 화면이 끝에 도달했을 때 호출되는 함수입니다
   */
  onEndReached: () => void;
  /**
   * '지금 무엇을 생각하고 있나요?' 섹션이 있는지 여부입니다
   */
  hasThinkSection?: boolean;
  /**
   * 데이터의 로딩 상태입니다
   */
  isLoading: boolean;
  /**
   * 데이터를 새로고침하는 컴포넌트입니다
   */
  refreshControl?: React.ReactNode;
  /**
   * 다음 페이지를 가져오는 중인지 여부입니다
   */
  isFetchingNextPage: boolean;
  hasInset?: boolean;
}

export type PostDataLayoutProps = PostDataLayoutCustomProps & ScrollViewProps;

export const PostDataLayout: React.FC<PostDataLayoutProps> = ({
  data,
  onEndReached,
  hasThinkSection = false,
  isLoading,
  refreshControl,
  isFetchingNextPage,
  hasInset = true,
  ...props
}) => {
  const theme = useTheme();

  const inset = useSafeAreaInsets();

  const { userData } = useGetUser();

  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const mineBottomSheet = useRef<BottomSheetRefProps>(null);

  const navigate = useNavigate();

  const [openUserBottomSheet, setOpenUserBottomSheet] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [author, setAuthor] = useState<GetCommentsAuthorProps | null>(null);
  const [bottomSheetLoading, setBottomSheetLoading] = useState(false);

  const onBottomSheetLoading = () => {
    setBottomSheetLoading(true);
    setTimeout(() => {
      setBottomSheetLoading(false);
    }, 200);
  };

  const onHeaderOptionPress = ({ postId, author, text, images }: HeaderOptionProps) => {
    onBottomSheetLoading();
    setOpenUserBottomSheet(false);
    setPostId(postId);
    const isOwn = author?.id && userData?.id === author.id && author.name ? true : false;
    setAuthor(author || null);
    if (isOwn) {
      setCommunityEdit({ text, images, id: postId });
    }
    openPostOptionBottomSheet(isOwn);
  };

  const openPostOptionBottomSheet = (isOwn: boolean) => {
    if (isOwn) {
      mineBottomSheet.current?.scrollTo(COMMUNITY_BOTTOM_SHEET_HEIGHT);
    } else {
      openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT });
    }
  };

  const onProfilePress = (author: GetCommentsAuthorProps | null) => {
    if (!author) {
      return Toast.show({
        type: 'info',
        position: 'top',
        text1: '익명 사용자의 프로필은 볼 수 없어요',
      });
    }
    onBottomSheetLoading();
    setAuthor(author);
    setOpenUserBottomSheet(true);
    openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT - 70 });
  };

  const onChatScreenNavigate = (id: number) => {
    navigate('CommunityPostDetail', { id });
  };

  const closeMineBottomSheet = () => {
    mineBottomSheet.current?.scrollTo(0);
  };

  useEffect(() => {
    const isBottomSheetActive = mineBottomSheet.current?.isActive();
    console.log('isBottomSheetActive', isBottomSheetActive);
  }, [mineBottomSheet.current]);

  return (
    <>
      {!hasThinkSection && isLoading ? (
        <Spinner size={40} isCenter />
      ) : isLoading ? (
        <>
          <PostsTopSection />
          <View
            style={{
              flex: 2,
            }}
          >
            <Spinner size={40} />
          </View>
        </>
      ) : data ? (
        data?.pages[0].data.total !== 0 ? (
          <FlatList
            scrollEventThrottle={16}
            data={data.pages || []}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={!hasThinkSection ? null : <PostsTopSection hasPadding />}
            refreshControl={refreshControl}
            style={{
              position: 'relative',
              paddingTop: hasInset ? (isIos ? inset.top + 14 : 24) : 24,
            }}
            contentContainerStyle={{
              paddingBottom: inset.bottom + 100,
              rowGap: 40,
            }}
            {...props}
            renderItem={({ item: { data } }) => (
              <View style={{ rowGap: 40 }}>
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
                      authorName,
                      id,
                    },
                    index,
                  ) => (
                    <S.CommunityMainBox key={id}>
                      <CommunityPostHeader
                        authorName={authorName}
                        author={author}
                        scopeOfDisclosure={scopeOfDisclosure}
                        createdAt={createdAt}
                        style={{ width: '100%', paddingHorizontal: 14 }}
                        openBottomSheet={() => {
                          onHeaderOptionPress({
                            postId: id,
                            author: author,
                            text: content.spans ? content.spans[0].text : '',
                            images: attachments.map((item) => ({
                              uri: item.thumbnail,
                              id: item.id,
                            })),
                          });
                        }}
                        onPress={() => onChatScreenNavigate(id)}
                        onProfilePress={() => onProfilePress(author || null)}
                      />
                      <CommunityPost
                        content={content}
                        attachments={attachments}
                        createdAt={createdAt}
                        onPress={() => onChatScreenNavigate(id)}
                        index={index}
                      />
                      <PostBottom id={id} reactions={reactions} commentCount={commentCount} />
                    </S.CommunityMainBox>
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
            {hasThinkSection && <PostsTopSection />}
            <S.CommunityMainNoDataWrapper style={{ flex: hasThinkSection ? 30 : 1 }}>
              <Text size={16} color={theme.placeholder} isCenter>
                아직 작성된 게시글이 없어요
              </Text>
            </S.CommunityMainNoDataWrapper>
          </>
        )
      ) : (
        <>
          {hasThinkSection && <PostsTopSection />}
          <S.CommunityMainNoDataWrapper style={{ flex: hasThinkSection ? 30 : 1 }}>
            <Text size={16} color={theme.placeholder} isCenter>
              지금은 게시글을 불러올 수 없어요
            </Text>
          </S.CommunityMainNoDataWrapper>
        </>
      )}
      <CommunityMineBottomSheet
        ref={mineBottomSheet}
        closeBottomSheet={closeMineBottomSheet}
        postId={postId}
      />
      <PostOptionBottomSheet
        bottomSheetLoading={bottomSheetLoading}
        userBottomSheet={openUserBottomSheet}
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        author={author}
      />
    </>
  );
};
