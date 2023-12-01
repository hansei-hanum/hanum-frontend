import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';

import { useGetImagesHeight } from 'src/hooks';
import { COMMUNITY_POST } from 'src/constants';
import { CommunityChat, CommunityPost, ScaleOpacity, Text } from 'src/components';

import { MentionUserListProps } from '../MetionUserList';

import * as S from './styled';

type ChatListProps = MentionUserListProps;

export const ChatList: React.FC<ChatListProps> = ({ onMention }) => {
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

  useEffect(() => {
    COMMUNITY_POST.content.image.forEach((uri, index) => {
      getHeightsForImage(uri, index);
    });
  }, [getHeightsForImage]);

  return (
    <S.ChatListContainer>
      <FlatList
        onEndReached={() => {
          console.log('onEndReached');
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={COMMUNITY_POST.chats}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10, rowGap: 10 }}
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
              댓글 {COMMUNITY_POST.chats.length}
            </Text>
          </>
        }
        renderItem={({ item: { author, time, message, replies }, index }) => (
          <CommunityChat
            author={author}
            time={time}
            message={message}
            index={index}
            children={
              <>
                <S.ChatReplyContainer>
                  <ScaleOpacity onPress={() => onMention(author.name, true)}>
                    <Text size={14} color={theme.placeholder}>
                      답글 달기
                    </Text>
                  </ScaleOpacity>
                  {replies && replies.length > 0 && (
                    <ScaleOpacity onPress={() => showChatReplies(index)}>
                      <Text size={14} color={theme.placeholder}>
                        {showReply[index] ? '댓글 숨기기' : `답글 ${replies.length}개 보기`}
                      </Text>
                    </ScaleOpacity>
                  )}
                </S.ChatReplyContainer>
                {showReply[index] && (
                  <View style={{ rowGap: 20 }}>
                    {replies.map(({ author, time, message }, index) => (
                      <CommunityChat
                        author={author}
                        time={time}
                        message={message}
                        index={index}
                        key={index}
                        isReply
                      />
                    ))}
                  </View>
                )}
              </>
            }
          />
        )}
      />
    </S.ChatListContainer>
  );
};
