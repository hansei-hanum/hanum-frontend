/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { runOnJS } from 'react-native-reanimated';

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
import { isIos } from 'src/utils';
import {
  ChatList,
  MentionUserList,
  ScrollBottomSheet,
  ScrollBottomSheetRefProps,
} from 'src/layouts';
import { useGetUser } from 'src/hooks';

import * as S from './styled';

const REPLY_BOX_IOS_OFFSET = -62;
const REPLY_BOX_ANDROID_OFFSET = -71.6;

const SCROLL_HEIGHT = -500;

export interface PhotoPermissionProps {
  granted: boolean;
  limited: boolean;
}

export const CommunityChatScreen: React.FC = () => {
  const inset = useSafeAreaInsets();

  const scrollBottomSheetRef = useRef<ScrollBottomSheetRefProps>(null);

  const [showButton, setShowButton] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [permission, setPermission] = useState<PhotoPermissionProps>({
    granted: false,
    limited: false,
  });

  const openImageBottomSheet = useCallback(() => {
    const isActive = scrollBottomSheetRef?.current?.isActive();
    if (isActive) {
      runOnJS(setShowButton)(false);
      scrollBottomSheetRef?.current?.scrollTo(0);
    } else {
      runOnJS(setShowButton)(true);
      scrollBottomSheetRef?.current?.scrollTo(SCROLL_HEIGHT);
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
        setPermission({ granted: true, limited: false });
        openImageBottomSheet();
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
        setPermission({ granted: true, limited: false });
        openImageBottomSheet();
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
        setPermission({ granted: false, limited: false });
        openImageBottomSheet();
      }
    } else {
      const permission = await Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission({ granted: true, limited: true });
        openImageBottomSheet();
        return;
      }
      const res = await Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission({ granted: true, limited: true });
        openImageBottomSheet();
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        setPermission({ granted: false, limited: false });
        openImageBottomSheet();
      }
    }
  }, []);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      console.log('permission', permission);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission({ granted: true, limited: false });
        openImageBottomSheet();
        return;
      } else if (permission === Permissions.RESULTS.LIMITED) {
        setPermission({ granted: false, limited: true });
        openImageBottomSheet();
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission({ granted: true, limited: false });
        openImageBottomSheet();
      } else if (res === Permissions.RESULTS.LIMITED) {
        setPermission({ granted: false, limited: true });
        openImageBottomSheet();
      } else {
        setPermission({ granted: false, limited: false });
        openImageBottomSheet();
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
    <GestureHandlerRootView style={{ flex: 1, paddingTop: inset.top, paddingBottom: inset.bottom }}>
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
      <ScrollBottomSheet
        ref={scrollBottomSheetRef}
        scrollHeight={SCROLL_HEIGHT}
        permission={permission}
        showButton={showButton}
        setShowButton={setShowButton}
      />
    </GestureHandlerRootView>
  );
};
