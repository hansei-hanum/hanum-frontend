/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import { Button } from 'react-native';

import { useTheme } from '@emotion/react';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import {
  CommunityHeader,
  CommunityUserImage,
  GoBackIcon,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { isIos } from 'src/utils';
import { ChatList, MentionUserList } from 'src/layouts';
import { useGetUser } from 'src/hooks';

import * as S from './styled';

const REPLY_BOX_IOS_OFFSET = -62;
const REPLY_BOX_ANDROID_OFFSET = -71.6;

export const CommunityChatScreen: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['100%', '70%'], []);

  async function hasAndroidPermission() {
    console.log('hasAndroidPermission');
    const getCheckPermissionPromise = () => {
      if (+Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (+Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  const handlePresentModalPress = useCallback(async () => {
    await hasAndroidPermission();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { userProfile } = useGetUser();

  const replyTranslateY = useRef<any>(new Animated.Value(0)).current;

  const chatRef = useRef<TextInput>(null);

  const [chat, setChat] = useState<string>('');
  const [isMention, setIsMention] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [getDeviceImage, setGetDeviceImage] = useState<boolean>(false);

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

  const openReplyBox = () => {
    Animated.timing(replyTranslateY, {
      toValue: isIos ? REPLY_BOX_IOS_OFFSET : REPLY_BOX_ANDROID_OFFSET,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const sendChat = () => {
    setChat('');
    chatRef.current?.blur();
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
      <Header
        isRow
        style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1, zIndex: -11 }}
      >
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
      <S.BottomInputWrapper behavior="padding" keyboardVerticalOffset={10}>
        <S.BottomInputContainer behavior="padding" keyboardVerticalOffset={10}>
          <S.BottomInputReplyBox
            ref={replyTranslateY}
            style={{ transform: [{ translateY: replyTranslateY }] }}
          >
            <Text size={14} color={theme.placeholder}>
              {userId}님에게 답글 남기는 중
            </Text>
            <ScaleOpacity onPress={closeReplyBox}>
              <MI name="cancel" size={24} color={theme.placeholder} />
            </ScaleOpacity>
          </S.BottomInputReplyBox>
          <S.BottomSendInputSection>
            <CommunityUserImage userImage={userProfile} />
            <S.BottomSendInputContainer>
              <S.BottomSendInput
                placeholder="댓글을 입력하세요"
                placeholderTextColor={theme.placeholder}
                ref={chatRef}
                value={chat}
                onChangeText={onChangeChat}
              />
              {chat.length > 0 ? (
                <ScaleOpacity onPress={sendChat}>
                  <MI name="send" size={28} color={theme.primary} />
                </ScaleOpacity>
              ) : (
                <ScaleOpacity onPress={handlePresentModalPress}>
                  <FI name="image" size={28} color={theme.black} />
                </ScaleOpacity>
              )}
            </S.BottomSendInputContainer>
          </S.BottomSendInputSection>
        </S.BottomInputContainer>
      </S.BottomInputWrapper>
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={{ zIndex: 99 }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={{ width: 100, height: 100 }}>
            <Text size={24}>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </S.CommunityChatWrapper>
  );
};
