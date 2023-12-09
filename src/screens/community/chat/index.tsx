/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@emotion/react';

import {
  CommunityHeader,
  CommunityUserImage,
  GoBackIcon,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { RPH, isIos } from 'src/utils';
import { ChatList, MentionUserList, ImageListBottomSheet, CommunityBottomSheet } from 'src/layouts';
import { useBottomSheet, useGetUser } from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';

const REPLY_BOX_IOS_OFFSET = -62;
const REPLY_BOX_ANDROID_OFFSET = -71.6;

const HAS_PERMISSION_SCROLL_HEIGHT = -RPH(70);
const NO_PERMISSION_SCROLL_HEIGHT = -RPH(38);

const status = {
  isAllGranted: { granted: true, limited: true },
  isBlocked: { granted: false, limited: false },
  isGranted: { granted: true, limited: false },
  isLimited: { granted: false, limited: true },
};

export interface PhotoPermissionProps {
  granted: boolean;
  limited: boolean;
}

export const CommunityChatScreen: React.FC = () => {
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

  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.BLOCKED
      ) {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    } else {
      const permission = await Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    }
  }, []);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      } else if (permission === Permissions.RESULTS.LIMITED) {
        setPermission(status.isLimited);
        openImageBottomSheet(status.isLimited);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      } else if (res === Permissions.RESULTS.LIMITED) {
        setPermission(status.isLimited);
        openImageBottomSheet(status.isLimited);
      } else {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions]);

  const handlePresentModalPress = useCallback(() => {
    checkPermission();
  }, []);

  const { userProfile } = useGetUser();

  const replyTranslateY = useRef<any>(new Animated.Value(0)).current;

  const chatRef = useRef<TextInput>(null);

  const [chat, setChat] = useState<string>('');
  const [mentionListOpen, setMentionListOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const theme = useTheme();

  const onChangeChat = (text: string) => {
    setChat(text);
    chatRef.current?.focus();
    if (chat.length < 1 || chat.includes('@')) {
      setMentionListOpen(true);
    }
  };

  const onMention = (id: string, isReply?: boolean) => {
    setUserId(id);
    onChangeChat(`${chat.split('@').slice(0, -1).join('@')}@${id} `);
    setMentionListOpen(false);
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
    Animated.timing(replyTranslateY, {
      toValue: 0,
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

  const checkIfStringHasSpaceAfterAt = (inputString: string): boolean => {
    const regex = /(?:^[^\s]+ )?(@\S*$)/;
    return regex.test(inputString);
  };

  return (
    <S.CommunityChatWrapper style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <Header
        isRow
        style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1, zIndex: -11 }}
      >
        <GoBackIcon />
        <CommunityHeader
          {...COMMUNITY_POST}
          style={{ flex: 1 }}
          openBottomSheet={() => openBottomSheet(true)}
        />
      </Header>
      {!mentionListOpen || !checkIfStringHasSpaceAfterAt(chat) ? (
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
      <ImageListBottomSheet
        ref={ImageListBottomSheetRef}
        scrollHeight={permissionHeight}
        permission={permission}
      />
      <CommunityBottomSheet
        isChatScreen
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
      />
    </S.CommunityChatWrapper>
  );
};
