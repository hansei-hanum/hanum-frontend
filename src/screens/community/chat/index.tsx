import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import FI from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

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
import { COMMUNITY_POST } from 'src/constants';
import { useGetImagesHeight, useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  const chatRef = useRef<TextInput>(null);

  const { userProfile } = useGetUser();

  const [selectedImage, setSelectedImage] = useState<string | undefined>('');
  const [chat, setChat] = useState<string>('');
  const [showReply, setShowReply] = useState<Array<boolean>>([]);

  const theme = useTheme();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const onChangeChat = (text: string) => {
    setChat(text);
  };

  const replyToChat = () => {
    console.log('replyToChat');
    setChat('');
    chatRef.current?.focus();
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
      <Header isRow>
        <GoBackIcon />
        <CommunityHeader {...COMMUNITY_POST} style={{ flex: 1 }} />
      </Header>
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
          StickyHeaderComponent={() => (
            <View
              style={{
                height: 10,
                backgroundColor: theme.background,
                borderColor: 'red',
                borderWidth: 1,
              }}
            />
          )}
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
              <Text size={16} style={{ paddingHorizontal: 14, paddingBottom: 10 }}>
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
                      <ScaleOpacity onPress={replyToChat}>
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
      <S.CommunityChatBottomContainer behavior="padding" keyboardVerticalOffset={10}>
        <S.CommunityChatImage source={userProfile ? { uri: userProfile } : UserLogo} />
        <S.CommunityChatInputContainer>
          <S.CommunityChatInput
            placeholder="댓글을 입력하세요."
            placeholderTextColor={theme.placeholder}
            ref={chatRef}
            value={chat}
            onChangeText={onChangeChat}
          />
          {chat.length > 0 || (selectedImage && selectedImage?.length > 0) ? (
            <ScaleOpacity onPress={() => {}}>
              <MI name="send" size={28} color={theme.primary} />
            </ScaleOpacity>
          ) : (
            <ScaleOpacity onPress={openImagePicker}>
              <FI name="image" size={28} color={theme.black} />
            </ScaleOpacity>
          )}
        </S.CommunityChatInputContainer>
      </S.CommunityChatBottomContainer>
    </S.CommunityChatWrapper>
  );
};
