/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

import { useTheme } from '@emotion/react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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
import { ChatList, ImageBottomSheet, MentionUserList } from 'src/layouts';
import { useGetUser } from 'src/hooks';

import * as S from './styled';

const REPLY_BOX_IOS_OFFSET = -62;
const REPLY_BOX_ANDROID_OFFSET = -71.6;

export const CommunityChatScreen: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isImageBottomSheetOpen, setIsImageBottomSheetOpen] = useState<boolean>(false);

  const openImageBottomSheet = () => {
    setIsImageBottomSheetOpen(true);
    bottomSheetModalRef.current.present();
  };

  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (permissions) {
        openImageBottomSheet();
      }
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }

      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (res) {
        openImageBottomSheet();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
    } else {
      const permission = await Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permission) {
        openImageBottomSheet();
      }
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (res) {
        openImageBottomSheet();
      }
      if (res) {
        bottomSheetModalRef.current.present();
      }
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
    }
  }, []);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permission) {
        openImageBottomSheet();
      }
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }

      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res) {
        openImageBottomSheet();
      }
      if (res === Permissions.RESULTS.GRANTED || res === Permissions.RESULTS.LIMITED) {
        setHasPermission(true);
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions]);

  const handlePresentModalPress = useCallback(() => {
    checkPermission();
  }, [checkPermission]);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current.close();
    setIsImageBottomSheetOpen(false);
  }, []);

  const { userProfile } = useGetUser();

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
                  <FI name="image" size={28} color={theme.default} />
                </ScaleOpacity>
              )}
            </S.BottomSendInputContainer>
          </S.BottomSendInputSection>
        </S.BottomInputContainer>
      </S.BottomInputWrapper>
      {isImageBottomSheetOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          activeOpacity={1}
          onPress={handleDismissModalPress}
        />
      )}
      <ImageBottomSheet bottomSheetModalRef={bottomSheetModalRef} hasPermission={hasPermission} />
    </S.CommunityChatWrapper>
  );
};
