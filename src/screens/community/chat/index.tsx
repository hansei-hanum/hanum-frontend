/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import FI from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
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
import { COMMUNITY_POST, COMMUNITY_USER_LIST } from 'src/constants';
import { useGetImagesHeight, useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { isIos } from 'src/utils';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  const bottomRef = useRef<View>(null);
  const replyTranslateY = useRef<any>(new Animated.Value(0)).current;

  const chatRef = useRef<TextInput>(null);

  const { userProfile } = useGetUser();

  const [selectedImage, setSelectedImage] = useState<string | undefined>('');
  const [chat, setChat] = useState<string>('');
  const [showReply, setShowReply] = useState<Array<boolean>>([]);
  const [isMention, setIsMention] = useState<boolean>(false);

  const theme = useTheme();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

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

  const onSendChat = () => {
    setChat('');
    chatRef.current?.blur();
  };

  const isMentioned = (id: string, isReply?: boolean) => {
    onChangeChat(`@${id} `);
    setIsMention(true);
    console.log(bottomRef.current);
    if (isReply) {
      Animated.timing(replyTranslateY, {
        toValue: isIos ? -62 : -71.6,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeReply = () => {
    Animated.timing(replyTranslateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setSelectedImage('');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          setSelectedImage('');
        } else {
          const imageUri = response.assets?.[0]?.uri;
          setSelectedImage(imageUri);
        }
      },
    );
  };

  useEffect(() => {
    COMMUNITY_POST.content.image.forEach((uri, index) => {
      getHeightsForImage(uri, index);
    });
  }, [getHeightsForImage]);

  return (
    <S.CommunityChatWrapper>
      <Header isRow style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1 }}>
        <GoBackIcon />
        <CommunityHeader {...COMMUNITY_POST} style={{ flex: 1 }} />
      </Header>
      {!chat.includes('@') || isMention || chat.includes(' ') ? (
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
            renderItem={({ item: { author, time, message, replies }, index }) => {
              return (
                <CommunityChat
                  author={author}
                  time={time}
                  message={message}
                  i={index}
                  children={
                    <>
                      <S.CommunityReplyContainer>
                        <ScaleOpacity onPress={() => isMentioned(author.name, true)}>
                          <Text size={14} color={theme.placeholder}>
                            답글 달기
                          </Text>
                        </ScaleOpacity>
                        {replies && replies.length > 0 && (
                          <ScaleOpacity
                            onPress={() => {
                              setShowReply((prev) => {
                                const temp = [...prev];
                                temp[index] = !temp[index];
                                return temp;
                              });
                            }}
                          >
                            <Text size={14} color={theme.placeholder}>
                              {showReply[index] ? '댓글 숨기기' : `답글 ${replies.length}개 보기`}
                            </Text>
                          </ScaleOpacity>
                        )}
                      </S.CommunityReplyContainer>
                      {showReply[index] && (
                        <View style={{ rowGap: 20 }}>
                          {replies.map(({ author, time, message }, i) => {
                            return (
                              <CommunityChat
                                author={author}
                                time={time}
                                message={message}
                                i={i}
                                key={i}
                                isReply
                              />
                            );
                          })}
                        </View>
                      )}
                    </>
                  }
                />
              );
            }}
          />
        </S.CommunityChatContainer>
      ) : (
        <View style={{ width: '100%', flex: 1 }}>
          {chat.length < 2 ? (
            <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
              @뒤에 유저 이름을 써주세요
            </Text>
          ) : (
            <FlatList
              data={COMMUNITY_USER_LIST}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                width: '100%',
                alignItems: 'flex-start',
                padding: 14,
                rowGap: 24,
              }}
              renderItem={({ item: { name, image, id } }) => {
                return (
                  <ScaleOpacity onPress={() => isMentioned(id)}>
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
                );
              }}
            />
          )}
        </View>
      )}
      <S.CommunityChatBottom behavior="padding" keyboardVerticalOffset={10}>
        <S.CommunityChatBottomContainer behavior="padding" keyboardVerticalOffset={10}>
          <S.CommunityChatReplyContainer
            ref={replyTranslateY}
            style={{ transform: [{ translateY: replyTranslateY }] }}
          >
            <Text size={14} color={theme.placeholder}>
              {chat}님에게 답글 남기는 중
            </Text>
            <ScaleOpacity onPress={closeReply}>
              <MI name="cancel" size={24} color={theme.placeholder} />
            </ScaleOpacity>
          </S.CommunityChatReplyContainer>
          <S.CommunityChatBottomWrapper ref={bottomRef}>
            <S.CommunityChatImage source={userProfile ? { uri: userProfile } : UserLogo} />
            <S.CommunityChatInputContainer>
              <S.CommunityChatInput
                placeholder="댓글을 입력하세요"
                placeholderTextColor={theme.placeholder}
                ref={chatRef}
                value={chat}
                onChangeText={onChangeChat}
              />
              {chat.length > 0 || (selectedImage && selectedImage?.length > 0) ? (
                <ScaleOpacity onPress={onSendChat}>
                  <MI name="send" size={28} color={theme.primary} />
                </ScaleOpacity>
              ) : (
                <ScaleOpacity onPress={openImagePicker}>
                  <FI name="image" size={28} color={theme.black} />
                </ScaleOpacity>
              )}
            </S.CommunityChatInputContainer>
          </S.CommunityChatBottomWrapper>
        </S.CommunityChatBottomContainer>
      </S.CommunityChatBottom>
    </S.CommunityChatWrapper>
  );
};
