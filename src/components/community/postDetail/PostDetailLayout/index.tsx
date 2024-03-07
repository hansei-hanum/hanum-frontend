import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { useGetImagesHeight, useGetPosts, useGetReplies } from 'src/hooks';
import { COMMUNITY_POST } from 'src/constants';
import { PostCommentCard, CommunityPost, ScaleOpacity, Text, Spinner } from 'src/components';
import {
  APIResponse,
  GetCommentsDetail,
  GetCommentsResponse,
  LimitedArticleScopeOfDisclosure,
} from 'src/api';
import { articleIdAtom } from 'src/atoms';

import { MentionUserListProps } from '../MetionUserList';

import * as S from './styled';

export const LoadingSpinner = () => {
  return (
    <S.PostDetailSpinnerWrapper>
      <Spinner size={40} />
    </S.PostDetailSpinnerWrapper>
  );
};

export interface PostDetailLayoutProps extends MentionUserListProps {
  commentsData?: APIResponse<GetCommentsResponse>[];
  setCommentId: (value: React.SetStateAction<number | null>) => void;
  onEndReached: () => void;
  isLoading: boolean;
}

export const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({
  onMention,
  setCommentId,
  onEndReached,
  commentsData,
  isLoading,
}) => {
  const { data: postData, isLoading: isPostsLoaindg } = useGetPosts({
    scope: LimitedArticleScopeOfDisclosure.Public,
    cursor: null,
  });
  console.log('postData', postData, postData?.pages[0]);

  const articleId = useRecoilValue(articleIdAtom);
  const [localCommentId, setLocalCommentId] = useState<number | null>(null);

  const {
    data: repliesPageData,
    fetchNextPage: fetchNextPageReplies,
    isFetchingNextPage: isFetchingReplyNextPage,
    isLoading: replyLoading,
  } = useGetReplies({
    articleId: articleId || -1,
    commentId: localCommentId || -1,
  });

  const repliesData = repliesPageData?.pages || [];
  const lastPage = repliesData[repliesData.length - 1] || [];

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const theme = useTheme();

  const [showReply, setShowReply] = useState<Array<boolean>>([]);

  const showChatReplies = (index: number) => {
    setShowReply((prev) => {
      const temp = [...prev];
      temp[index] = !temp[index];
      return temp;
    });
  };

  const showMoreReplies = (id: number) => {
    showChatReplies(id);
    setCommentId(id);
    setLocalCommentId(id);
  };

  useEffect(() => {
    COMMUNITY_POST.content.image.forEach((uri, index) => {
      getHeightsForImage(uri, index);
    });
  }, [getHeightsForImage]);

  return (
    <S.PostDetailLayoutContainer>
      <FlatList
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={commentsData}
        keyExtractor={(_, index) => index.toString()}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingBottom: 10,
          rowGap: 10,
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            {!isPostsLoaindg && postData ? (
              <S.CommunityPostWrapper>
                <CommunityPost
                  content={postData.pages[0].data.items[0].content}
                  createdAt={postData?.pages[0].data.items[0].createdAt}
                  attachments={postData?.pages[0].data.items[0].attachments}
                  index={0}
                  imageHeights={imageHeights}
                />
              </S.CommunityPostWrapper>
            ) : (
              <LoadingSpinner />
            )}
            {isLoading && !commentsData ? (
              <LoadingSpinner />
            ) : (
              commentsData && (
                <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
                  댓글 {commentsData[0].data.total}개
                </Text>
              )
            )}
          </>
        }
        ListFooterComponent={
          isLoading ? (
            <View style={{ paddingVertical: 20 }}>
              <Spinner size={40} />
            </View>
          ) : null
        }
        renderItem={({ item: { data } }) =>
          !isLoading && data && data.items.length <= 0 && data.cursor === 0 ? (
            <Text
              size={16}
              style={{ paddingHorizontal: 14, paddingVertical: 14 }}
              isCenter
              color={theme.placeholder}
            >
              첫 댓글을 남겨보세요
            </Text>
          ) : (
            <>
              {data.items.map((props: GetCommentsDetail, index) => (
                <>
                  <PostCommentCard
                    {...props}
                    index={index}
                    children={
                      <S.PostDetailLayoutReplyContainer>
                        <ScaleOpacity onPress={() => onMention(props.id.toString(), props.id)}>
                          <Text size={14} color={theme.placeholder}>
                            답글 달기
                          </Text>
                        </ScaleOpacity>
                        {props.replyCount > 0 && (
                          <ScaleOpacity onPress={() => showMoreReplies(props.id)}>
                            <Text size={14} color={theme.placeholder}>
                              {showReply[props.id]
                                ? '답글 숨기기'
                                : `답글 ${props.replyCount}개 보기`}
                            </Text>
                          </ScaleOpacity>
                        )}
                      </S.PostDetailLayoutReplyContainer>
                    }
                  />
                  {showReply[props.id] && (
                    <View
                      style={{
                        rowGap: 4,
                        paddingLeft: 20,
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                    >
                      {replyLoading ? (
                        <View style={{ paddingVertical: 20 }}>
                          <Spinner size={40} />
                        </View>
                      ) : (
                        repliesData &&
                        repliesData.length > 0 &&
                        repliesData.map(
                          ({ data: { items } }) =>
                            items &&
                            items.length > 0 &&
                            items.map((reply, index) => (
                              <PostCommentCard {...reply} index={index} key={index} isReply />
                            )),
                        )
                      )}
                      {isFetchingReplyNextPage && (
                        <View style={{ paddingVertical: 20 }}>
                          <Spinner size={40} />
                        </View>
                      )}
                      {!replyLoading &&
                        repliesData &&
                        repliesData[0].data.total >= 10 &&
                        lastPage.data.cursor < lastPage.data.nextCursor && (
                          <View style={{ paddingLeft: 20 }}>
                            <ScaleOpacity onPress={fetchNextPageReplies}>
                              <Text size={14} color={theme.placeholder}>
                                답글 더보기
                              </Text>
                            </ScaleOpacity>
                          </View>
                        )}
                    </View>
                  )}
                </>
              ))}
            </>
          )
        }
      />
    </S.PostDetailLayoutContainer>
  );
};
