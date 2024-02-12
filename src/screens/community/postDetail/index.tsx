/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Switch, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import { useTheme } from '@emotion/react';

import {
  CommunityPostHeader,
  CommunityUserImage,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { RPH } from 'src/utils';
import { ChatList, MentionUserList, ImageListBottomSheet, CommunityBottomSheet } from 'src/layouts';
import { useBottomSheet, useCheckPhotoPermission, useGetUser, useSetAnimation } from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';
import { RootStackParamList } from 'src/Router';

import * as S from './styled';
const HAS_PERMISSION_SCROLL_HEIGHT = -RPH(70);
const NO_PERMISSION_SCROLL_HEIGHT = -RPH(38);

export const status = {
  isAllGranted: { granted: true, limited: true },
  isBlocked: { granted: false, limited: false },
  isGranted: { granted: true, limited: false },
  isLimited: { granted: false, limited: true },
};

export interface PhotoPermissionProps {
  granted: boolean;
  limited: boolean;
}
export type CommunityChatScreenProps = StackScreenProps<RootStackParamList, 'CommunityChat'>;

export const CommunityChatScreen: React.FC<CommunityChatScreenProps> = ({ route }) => {
  const { id } = route.params;
  console.log(id);
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const inset = useSafeAreaInsets();

  const ImageListBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const [permission, setPermission] = useState<PhotoPermissionProps>({
    granted: false,
    limited: false,
  });

  const permissionHeight =
    permission.granted || permission.limited
      ? HAS_PERMISSION_SCROLL_HEIGHT
      : NO_PERMISSION_SCROLL_HEIGHT;

  const openImageBottomSheet = useCallback(({ granted, limited }: PhotoPermissionProps) => {
    const isActive = ImageListBottomSheetRef?.current?.isActive();
    if (isActive) {
      ImageListBottomSheetRef?.current?.scrollTo(0);
    } else {
      ImageListBottomSheetRef?.current?.scrollTo(
        granted || limited ? HAS_PERMISSION_SCROLL_HEIGHT : NO_PERMISSION_SCROLL_HEIGHT,
      );
    }
    chatRef.current?.blur();
  }, []);

  const { checkPhotoPermission } = useCheckPhotoPermission({ setPermission, openImageBottomSheet });

  const handlePresentModalPress = useCallback(() => {
    checkPhotoPermission();
  }, []);

  const { userProfile } = useGetUser();

  // TODO: reply box Collapse 구현
  const replyAnimation = useRef(new Animated.Value(0)).current;
  const anonymousAnimation = useRef(new Animated.Value(0)).current;
  const { animation } = useSetAnimation();

  const chatRef = useRef<TextInput>(null);

  const [chat, setChat] = useState<string>('');
  const [mentionListOpen, setMentionListOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [paddingBottom, setPaddingBottom] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isReplyChat, setIsReplyChat] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const theme = useTheme();

  const onChangeChat = (text: string) => {
    setChat(text);
    chatRef.current?.focus();
    if (chat.length < 1 || chat.includes('@')) {
      setMentionListOpen(true);
    }
  };

  const onPressChatInput = () => {
    setInputFocus(true);
    setPaddingBottom(isReplyChat ? 100 : 50);
    animation({ animation: anonymousAnimation, value: 1 });
  };

  const onPressOutChatInput = () => {
    setInputFocus(false);
    setChat('');
    setPaddingBottom(0);
    setIsReplyChat(false);
    setIsAnonymous(false);
    animation({ animation: anonymousAnimation, value: 0 });
    animation({ animation: replyAnimation, value: 0, duration: 150 });
  };

  const onMention = (id: string, isReply?: boolean) => {
    setUserId(id);
    onChangeChat(`${chat.split('@').slice(0, -1).join('@')}@${id} `);
    setMentionListOpen(false);
    if (isReply) {
      setIsReplyChat(true);
      openReplyBox();
    }
  };

  const openReplyBox = () => {
    animation({ animation: replyAnimation, value: 1, duration: 250 });
  };

  const sendChat = () => {
    setPaddingBottom(0);
    setChat('');
    chatRef.current?.blur();
    animation({ animation: replyAnimation, value: 0, duration: 100 });
  };

  const closeReplyBox = () => {
    setIsReplyChat(false);
    setPaddingBottom(50);
    setChat('');
    animation({ animation: replyAnimation, value: 0, duration: 100 });
  };

  const checkIfStringHasSpaceAfterAt = (inputString: string): boolean => {
    const regex = /(?:^[^\s]+ )?(@\S*$)/;
    return regex.test(inputString);
  };

  const onOptionPress = () => {
    chatRef.current?.blur();
    openBottomSheet();
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <S.CommunityChatWrapper style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <Header
        isRow
        style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1, zIndex: -11 }}
        hasGoBackIcon
      >
        <CommunityPostHeader
          {...COMMUNITY_POST}
          style={{ flex: 1 }}
          openBottomSheet={onOptionPress}
        />
      </Header>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10} style={{ flex: 1 }}>
        {!mentionListOpen || !checkIfStringHasSpaceAfterAt(chat) ? (
          <ChatList onMention={onMention} paddingBottom={paddingBottom} />
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
        <S.BottomInputWrapper>
          <S.BottomInputContainer behavior="padding" keyboardVerticalOffset={10}>
            <S.BottomInputReplyBox
              style={{
                opacity: replyAnimation,
                position: inputFocus ? 'relative' : 'absolute',
              }}
            >
              <Text size={14} color={theme.placeholder}>
                {userId}님에게 답글 남기는 중
              </Text>
              <ScaleOpacity onPress={closeReplyBox}>
                <MI name="cancel" size={24} color={theme.placeholder} />
              </ScaleOpacity>
            </S.BottomInputReplyBox>
            <S.AnonymousBox
              style={{
                opacity: anonymousAnimation,
                position: inputFocus ? 'relative' : 'absolute',
              }}
            >
              <Text size={15}>익명 댓글</Text>
              <Switch
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                trackColor={{ false: theme.lightGray, true: theme.primary }}
                thumbColor={isAnonymous ? theme.white : theme.white}
                ios_backgroundColor={theme.lightGray}
                onValueChange={toggleAnonymous}
                value={isAnonymous}
              />
            </S.AnonymousBox>
            <S.BottomSendInputSection>
              <CommunityUserImage userImage={userProfile} />
              <S.BottomSendInputContainer>
                <S.BottomSendInput
                  placeholder="댓글을 입력하세요"
                  placeholderTextColor={theme.placeholder}
                  ref={chatRef}
                  value={chat}
                  onChangeText={onChangeChat}
                  onFocus={onPressChatInput}
                  onBlur={onPressOutChatInput}
                />
                {chat.length > 0 ? (
                  <ScaleOpacity onPress={sendChat}>
                    <MI name="send" size={28} color={theme.primary} />
                  </ScaleOpacity>
                ) : (
                  <ScaleOpacity onPress={handlePresentModalPress}>
                    <FI name="image" size={28} color={theme.default} />
                  </ScaleOpacity>
                )}
              </S.BottomSendInputContainer>
            </S.BottomSendInputSection>
          </S.BottomInputContainer>
        </S.BottomInputWrapper>
        <ImageListBottomSheet
          ref={ImageListBottomSheetRef}
          scrollHeight={permissionHeight}
          permission={permission}
        />
      </KeyboardAvoidingView>
      <CommunityBottomSheet bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />
    </S.CommunityChatWrapper>
  );
};
