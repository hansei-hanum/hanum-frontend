import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, TextLayoutEventData, View } from 'react-native';
import FI from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import {
  CommunityHeader,
  CommunityPost,
  GoBackIcon,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { useGetImagesHeight, useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { getPostTime } from 'src/utils';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  const { userProfile } = useGetUser();

  const [chat, setChat] = useState<string>('');
  const [isOverlay, setIsOverlay] = useState<Array<boolean>>([]);
  const [isShow, setIsShow] = useState<Array<boolean>>([]);

  const theme = useTheme();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const showMore = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const showLess = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = false;
      return temp;
    });
  };

  const overlay = (index: number) => {
    setIsOverlay((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const onChangeChat = (text: string) => {
    setChat(text);
  };

  useEffect(() => {
    COMMUNITY_POST.content.image.forEach((uri, index) => {
      getHeightsForImage(uri, index);
    });
  }, [getHeightsForImage]);

  return (
    <S.CommunityChatWrapper>
      <Header isRow>
        <GoBackIcon />
        <CommunityHeader {...COMMUNITY_POST} style={{ flex: 1 }} />
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          rowGap: 10,
        }}
      >
        <CommunityPost
          author={COMMUNITY_POST.author}
          content={COMMUNITY_POST.content}
          time={COMMUNITY_POST.time}
          type={COMMUNITY_POST.type}
          imageHeights={imageHeights}
          index={0}
          isSingle
        />
        <Text size={15} style={{ paddingHorizontal: 10 }}>
          댓글 {COMMUNITY_POST.chats.length}
        </Text>
        <S.CommunityChatContainer>
          {COMMUNITY_POST.chats.map(({ author, time, message }, i) => {
            return (
              <S.CommunityChatContent key={i}>
                <S.CommunityChatImage source={author.image ? { uri: author.image } : UserLogo} />
                <View style={{ rowGap: 4, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text size={13}>{author.name}</Text>
                    <Text size={13} color={theme.placeholder}>
                      {'  '}
                      {getPostTime(time)}
                    </Text>
                  </View>
                  {!isShow[i] ? (
                    <S.ChatContainer>
                      <S.Chat
                        numberOfLines={14}
                        ellipsizeMode="tail"
                        onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
                          event.nativeEvent.lines.length >= 14 && overlay(i);
                        }}
                      >
                        {message}
                      </S.Chat>
                      {isOverlay[i] && (
                        <ScaleOpacity onPress={() => showMore(i)}>
                          <Text size={14} color={theme.placeholder}>
                            더보기
                          </Text>
                        </ScaleOpacity>
                      )}
                    </S.ChatContainer>
                  ) : (
                    <S.ChatContainer>
                      <S.Chat>{message}</S.Chat>
                      <ScaleOpacity onPress={() => showLess(i)}>
                        <Text size={14} color={theme.placeholder}>
                          간략하게 보기
                        </Text>
                      </ScaleOpacity>
                    </S.ChatContainer>
                  )}
                </View>
              </S.CommunityChatContent>
            );
          })}
        </S.CommunityChatContainer>
      </ScrollView>
      <S.CommunityChatBottomContainer behavior="padding" keyboardVerticalOffset={10}>
        <S.CommunityChatImage source={userProfile ? { uri: userProfile } : UserLogo} />
        <S.CommunityChatInputContainer>
          <S.CommunityChatInput
            placeholder="댓글을 입력하세요."
            placeholderTextColor={theme.placeholder}
            value={chat}
            onChangeText={onChangeChat}
          />
          {chat.length > 0 ? (
            <ScaleOpacity onPress={() => {}}>
              <MI name="send" size={28} color={theme.primary} />
            </ScaleOpacity>
          ) : (
            <ScaleOpacity onPress={() => {}}>
              <FI name="image" size={28} color={theme.black} />
            </ScaleOpacity>
          )}
        </S.CommunityChatInputContainer>
      </S.CommunityChatBottomContainer>
    </S.CommunityChatWrapper>
  );
};
