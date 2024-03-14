import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { useGetReplies } from 'src/hooks';
import { PostCommentCard, CommunityPost, ScaleOpacity, Text, Spinner } from 'src/components';
import {
  APIResponse,
  GetCommentsDetail,
  GetCommentsResponse,
  GetPostByIdResponse,
  GetRepliesResponse,
} from 'src/api';
import { articleIdAtom } from 'src/atoms';
import { RPH } from 'src/utils';

import { MentionUserListProps } from '../MetionUserList';

import * as S from './styled';

export const LoadingSpinner = () => {
  return (
    <S.PostDetailSpinnerWrapper>
      <Spinner size={40} />
    </S.PostDetailSpinnerWrapper>
  );
};

export interface PostDetailLayoutProps extends Pick<MentionUserListProps, 'onTag'> {
  commentsData?: APIResponse<GetCommentsResponse>[];
  setCommentId: (value: React.SetStateAction<number | null>) => void;
  onEndReached: () => void;
  isLoading: boolean;
  postData?: GetPostByIdResponse;
  isPostLoading: boolean;
}

export const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({
  onTag: onMention,
  setCommentId,
  onEndReached,
  commentsData,
  isLoading,
  postData,
  isPostLoading,
}) => {
  const articleId = useRecoilValue(articleIdAtom);
  const [localCommentId, setLocalCommentId] = useState<number | null>(null);

  const {
    data: repliesPageData,
    fetchNextPage: fetchNextPageReplies,
    isFetchingNextPage: isFetchingReplyNextPage,
    isLoading: replyLoading,
  } = useGetReplies({
    articleId: articleId,
    commentId: localCommentId,
  });

  const repliesData = repliesPageData?.pages || [];
  const lastPage = repliesData[repliesData.length - 1] || [];

  const theme = useTheme();

  const [showReply, setShowReply] = useState<Array<boolean>>([]);
  const [replyData, setReplyData] = useState<{ [key: number]: APIResponse<GetRepliesResponse>[] }>(
    {},
  );

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
    if (repliesData && repliesData.length > 0 && localCommentId) {
      setReplyData((prev) => {
        const newReplyData = Array.isArray(repliesData) ? repliesData : [];
        return { ...prev, [localCommentId]: newReplyData };
      });
    }
  }, [replyLoading]);

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
        ListHeaderComponent={
          <>
            {!isPostLoading && postData ? (
              <S.CommunityPostWrapper>
                <CommunityPost
                  content={postData.content}
                  createdAt={postData.createdAt}
                  attachments={postData.attachments}
                  index={0}
                  style={{
                    minHeight: RPH(20),
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
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
          !isLoading && data.total === 0 ? (
            <Text
              size={16}
              style={{ paddingHorizontal: 14, paddingVertical: 14 }}
              isCenter
              color={theme.placeholder}
            >
              첫 댓글을 남겨보세요
            </Text>
          ) : (
            <S.PostCommentCardContainer>
              {data.items.map((props: GetCommentsDetail, index) => (
                <View key={index}>
                  <PostCommentCard
                    {...props}
                    index={index}
                    children={
                      <S.PostDetailLayoutReplyContainer>
                        <ScaleOpacity
                          onPress={() =>
                            onMention({
                              userName: props.author?.name,
                              commentId: props.id,
                              isReply: true,
                            })
                          }
                        >
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
                        rowGap: 14,
                        paddingLeft: 44,
                        marginTop: 4,
                        marginBottom: 20,
                      }}
                    >
                      {replyLoading ? (
                        <View style={{ paddingVertical: 20 }}>
                          <Spinner size={40} />
                        </View>
                      ) : (
                        replyData[props.id] &&
                        replyData[props.id].length > 0 &&
                        replyData[props.id].map(
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
                      {!replyLoading && lastPage && lastPage.data.nextCursor && (
                        <View style={{ paddingLeft: 20 }}>
                          <ScaleOpacity onPress={fetchNextPageReplies}>
                            <Text size={14} color={theme.placeholder}>
                              더 보기
                            </Text>
                          </ScaleOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </S.PostCommentCardContainer>
          )
        }
      />
    </S.PostDetailLayoutContainer>
  );
};
