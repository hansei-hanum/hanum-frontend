/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Animated } from 'react-native';

import { useTheme } from '@emotion/react';

import { CommunityHeader, GoBackIcon, Header, Text } from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { isIos } from 'src/utils';
import { BottomInput, ChatList, MentionUserList } from 'src/layouts';

import * as S from './styled';

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
        <ChatList onMention={onMention} />
      ) : (
        <View style={{ width: '100%', flex: 1 }}>
          {chat.length < 2 ? (
            <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
              @뒤에 유저 이름을 써주세요
            </Text>
          ) : (
            <MentionUserList onMention={onMention} />
          )}
        </View>
      )}
      <BottomInput
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
