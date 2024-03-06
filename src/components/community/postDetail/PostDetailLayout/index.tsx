import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';

import { useGetImagesHeight } from 'src/hooks';
import { COMMUNITY_POST } from 'src/constants';
import { PostCommentCard, CommunityPost, ScaleOpacity, Text, Spinner } from 'src/components';
import { APIResponse, GetCommentsDetail, GetCommentsResponse } from 'src/api';

import { MentionUserListProps } from '../MetionUserList';

import * as S from './styled';

export interface PostDetailLayoutProps extends MentionUserListProps {
  data?: APIResponse<GetCommentsResponse>[];
  onEndReached: () => void;
  isLoading: boolean;
}

export const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({
  onMention,
  onEndReached,
  data,
  isLoading,
}) => {
  console.log(data, 'data');
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

  const getCommentsLength = () => {
    if (data && data[0].data && data[0].data.comments.length >= 0) {
      return data
        ?.map(({ data: { comments } }) => comments.length)
        .reduce((acc, cur) => acc + cur, 0);
    }
    return 0;
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
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10, rowGap: 10 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <CommunityPost
              author={COMMUNITY_POST.author}
              content={COMMUNITY_POST.content}
              time={COMMUNITY_POST.time}
              type={COMMUNITY_POST.type}
              imageHeights={imageHeights}
              index={0}
              isSingle
            />
            <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
              댓글 {getCommentsLength()}개
            </Text>
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
          data && data.comments.length <= 0 ? (
            <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
              첫 댓글을 남겨보세요
            </Text>
          ) : (
            <>
              {data.comments.map(
                (
                  { attachment, author, createdAt, content, id, replyCount }: GetCommentsDetail,
                  index,
                ) => (
                  <>
                    <PostCommentCard
                      attachment={attachment}
                      author={author}
                      createdAt={createdAt}
                      content={content}
                      index={index}
                      children={
                        <S.PostDetailLayoutReplyContainer>
                          <ScaleOpacity onPress={() => onMention(id.toString(), true)}>
                            <Text size={14} color={theme.placeholder}>
                              답글 달기
                            </Text>
                          </ScaleOpacity>
                          {replyCount > 0 && (
                            <ScaleOpacity onPress={() => showChatReplies(index)}>
                              <Text size={14} color={theme.placeholder}>
                                {showReply[index] ? '답글 숨기기' : `답글 ${replyCount}개 보기`}
                              </Text>
                            </ScaleOpacity>
                          )}
                        </S.PostDetailLayoutReplyContainer>
                      }
                    />
                    {showReply[index] && (
                      <View
                        style={{
                          rowGap: 20,
                          paddingLeft: 20,
                          marginTop: 10,
                          marginBottom: 20,
                        }}
                      >
                        {/* {replies.map((props, index) => (
                  <PostCommentCard {...props} index={index} key={index} isReply />
                ))} */}
                      </View>
                    )}
                  </>
                ),
              )}
            </>
          )
        }
      />
    </S.PostDetailLayoutContainer>
  );
};
