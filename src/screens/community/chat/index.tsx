/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, TextInput, View } from 'react-native';
import { Animated } from 'react-native';

import { useTheme } from '@emotion/react';

import {
  CommunityChat,
  CommunityHeader,
  CommunityPost,
  GoBackIcon,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_POST, COMMUNITY_USER_LIST, CommunityChatListItems } from 'src/constants';
import { useGetImagesHeight } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { isIos } from 'src/utils';
import { CommunityChatBottomInput } from 'src/layouts';

import * as S from './styled';

interface MentionUserProps {
  onMention: (id: string, isReply?: boolean) => void;
}

const MentionUsers: React.FC<MentionUserProps> = ({ onMention }) => {
  const theme = useTheme();

  return (
    <FlatList
      data={COMMUNITY_USER_LIST}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{
        width: '100%',
        alignItems: 'flex-start',
        padding: 14,
        rowGap: 24,
      }}
      renderItem={({ item: { name, image, id } }) => (
        <ScaleOpacity onPress={() => onMention(id)}>
          <S.CommunityUserContainer>
            <S.CommunityUserImage source={image ? { uri: image } : UserLogo} />
            <View>
              <Text size={16}>{name}</Text>
              <Text size={14} color={theme.placeholder}>
                {id}
              </Text>
            </View>
          </S.CommunityUserContainer>
        </ScaleOpacity>
      )}
    />
  );
};

type ChatsProps = MentionUserProps;

const Chats: React.FC<ChatsProps> = ({ onMention }) => {
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
    <S.CommunityChatContainer>
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
                <S.CommunityReplyContainer>
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
                </S.CommunityReplyContainer>
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
    </S.CommunityChatContainer>
  );
};

export interface RenderChatItemProps extends ListRenderItemInfo<CommunityChatListItems> {
  onMention: (id: string, isReply?: boolean) => void;
}

export const CommunityChatScreen: React.FC = () => {
  const replyTranslateY = useRef<any>(new Animated.Value(0)).current;

  const chatRef = useRef<TextInput>(null);

  const [chat, setChat] = useState<string>('');
  const [isMention, setIsMention] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const theme = useTheme();

  const onChangeChat = (text: string) => {
    setChat(text);
    chatRef.current?.focus();
    if (chat.length < 1) {
      setIsMention(false);
    }
    if (chat.includes('@')) {
      setIsMention(false);
    }
  };

  const onMention = (id: string, isReply?: boolean) => {
    setUserId(id);
    onChangeChat(`@${id} `);
    setIsMention(true);
    if (isReply) {
      openReplyBox();
    }
  };

  const onSendChat = () => {
    setChat('');
    chatRef.current?.blur();
  };

  const openReplyBox = () => {
    Animated.timing(replyTranslateY, {
      toValue: isIos ? -62 : -71.6,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeReplyBox = () => {
    setChat('');
    Animated.timing(replyTranslateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <S.CommunityChatWrapper>
      <Header isRow style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1 }}>
        <GoBackIcon />
        <CommunityHeader {...COMMUNITY_POST} style={{ flex: 1 }} />
      </Header>
      {!chat.includes('@') || isMention || chat.includes(' ') ? (
        <Chats onMention={onMention} />
      ) : (
        <View style={{ width: '100%', flex: 1 }}>
          {chat.length < 2 ? (
            <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
              @뒤에 유저 이름을 써주세요
            </Text>
          ) : (
            <MentionUsers onMention={onMention} />
          )}
        </View>
      )}
      <CommunityChatBottomInput
        replyTranslateY={replyTranslateY}
        userId={userId}
        closeReplyBox={closeReplyBox}
        chatRef={chatRef}
        onChangeChat={onChangeChat}
        onSendChat={onSendChat}
        chat={chat}
      />
    </S.CommunityChatWrapper>
  );
};
