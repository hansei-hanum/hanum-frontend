/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { Animated } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@emotion/react';

import {
  CommunityHeader,
  CommunityUserImage,
  GoBackIcon,
  Header,
  ScaleOpacity,
  Text,
  ScrollBottomSheetRefProps,
  ScrollBottomSheet,
} from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { isIos } from 'src/utils';
import { ChatList, MentionUserList } from 'src/layouts';
import { useGetUser } from 'src/hooks';

import * as S from './styled';

export const lorem: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta faucibus turpis, a auctor justo tempus vitae. Morbi pellentesque massa felis, vitae ultrices turpis condimentum eu. Aliquam nunc velit, volutpat sit amet lobortis at, cursus ac mauris. Donec ut augue tempor, facilisis erat sed, tempor tortor. Ut eget nibh ac felis vestibulum convallis. Donec iaculis efficitur orci, id ultricies dolor lacinia in. Duis quis lectus a purus ultricies tincidunt. Quisque condimentum turpis sed massa elementum, lacinia egestas nisi ultrices. Duis faucibus porta porta. Sed quam neque, sodales nec urna sit amet, scelerisque malesuada urna. Suspendisse commodo ex sed diam egestas tristique. Sed id odio massa. Donec non orci vel metus consectetur vehicula id ac metus. Nullam lorem ex, ullamcorper in efficitur et, varius vitae risus. Nullam imperdiet sapien sed ligula imperdiet, non rhoncus lectus vehicula. Suspendisse ultrices faucibus orci non feugiat.

Fusce feugiat, dui a consectetur tincidunt, enim eros rhoncus quam, eu consectetur massa diam id ligula. Cras rutrum urna vitae orci viverra, at pharetra mi eleifend. Praesent iaculis nunc eget lacinia rhoncus. Nunc in ultrices eros, ut rutrum ex. Nunc sollicitudin condimentum faucibus. Ut hendrerit neque sed libero suscipit condimentum laoreet vitae dui. Pellentesque nec laoreet velit. Duis sollicitudin finibus odio. Vestibulum ut tellus sem. Suspendisse potenti. Nam ultricies in ipsum quis mollis. Morbi eleifend turpis sed magna feugiat feugiat. Integer cursus purus scelerisque, varius urna vel, pulvinar augue. Etiam ac mauris eu ante scelerisque tincidunt vel ut arcu. Nullam lacinia urna sit amet elementum vulputate. Fusce viverra lacus id elit laoreet, sit amet convallis dolor accumsan.

Morbi laoreet volutpat mauris quis gravida. Nullam eget sapien eu dui mollis pharetra ac ut nunc. Integer vitae gravida lectus. Etiam sed eleifend diam, at egestas nisl. Morbi dictum quam quis velit placerat venenatis. Aliquam ut nibh non arcu cursus volutpat. Maecenas ultricies risus quis nunc facilisis, et sagittis ante maximus. Quisque at viverra diam.

Nunc a convallis ligula. Nunc quis accumsan augue, lobortis ornare diam. Aenean euismod nunc sed luctus sollicitudin. Donec ultricies est ante. In gravida sed lectus eu hendrerit. Nam ut massa ullamcorper, gravida libero quis, varius augue. Sed faucibus, nibh non iaculis congue, eros lorem faucibus elit, id consequat justo felis ut nisi.

Vivamus aliquet finibus elementum. In efficitur tellus nec sem malesuada, tristique malesuada felis rutrum. Nullam vel purus dolor. Quisque convallis porta velit, nec pulvinar eros mattis in. Etiam sit amet ultricies tortor. Duis sit amet ex sed ligula consectetur aliquet. Proin tincidunt viverra lobortis. Aenean ac commodo ante. Ut tincidunt ac ex a consectetur. Ut placerat, sem id suscipit finibus, mi libero malesuada lorem, tempus rutrum augue ex quis turpis. Morbi vel feugiat nulla, et pharetra tortor. Aenean sit amet sollicitudin tellus, sed commodo nisi. Curabitur fermentum, ligula sed vestibulum aliquet, elit metus lobortis est, in ullamcorper dui massa eget elit. Pellentesque in diam vulputate, tristique massa ac, aliquet ante. Fusce feugiat finibus pulvinar.

Phasellus a velit justo. Cras nec nisl blandit, faucibus mauris consectetur, rhoncus metus. Suspendisse volutpat sapien sit amet auctor gravida. Proin sit amet risus rhoncus, pretium nibh et, consectetur eros. Praesent condimentum quis metus quis auctor. Duis venenatis, mi ut porttitor tempor, justo leo laoreet arcu, sit amet ullamcorper tortor velit vitae lacus. Aliquam non bibendum dui, vitae aliquet libero. Sed vel arcu nec sapien efficitur malesuada consectetur vitae lectus. Mauris euismod sed enim et elementum. Nulla ullamcorper aliquam mi eu lobortis. Etiam at auctor justo. In libero magna, commodo nec nunc ac, vestibulum pellentesque eros.`;

const REPLY_BOX_IOS_OFFSET = -62;
const REPLY_BOX_ANDROID_OFFSET = -71.6;

const SCROLL_HEIGHT = -500;

export const CommunityChatScreen: React.FC = () => {
  const inset = useSafeAreaInsets();

  const scrollBottomSheetRef = useRef<ScrollBottomSheetRefProps>(null);

  const openImageBottomSheet = useCallback(() => {
    const isActive = scrollBottomSheetRef?.current?.isActive();
    if (isActive) {
      scrollBottomSheetRef?.current?.scrollTo(0);
    } else {
      scrollBottomSheetRef?.current?.scrollTo(SCROLL_HEIGHT);
    }
  }, []);

  const [hasPermission, setHasPermission] = useState<boolean>(false);

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
        setHasPermission(true);
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
        setHasPermission(true);
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
        setHasPermission(false);
        openImageBottomSheet();
      }
    } else {
      const permission = await Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        openImageBottomSheet();
        return;
      }
      const res = await Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        openImageBottomSheet();
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        setHasPermission(false);
        openImageBottomSheet();
      }
    }
  }, []);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      console.log('permission', permission);
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        openImageBottomSheet();
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === Permissions.RESULTS.GRANTED || res === Permissions.RESULTS.LIMITED) {
        setHasPermission(true);
        openImageBottomSheet();
      } else {
        setHasPermission(false);
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
      <ScrollBottomSheet ref={scrollBottomSheetRef} scrollHeight={SCROLL_HEIGHT}>
        <View style={{ height: 'auto', width: '100%' }}>
          <Text size={15} style={styles.text}>
            {lorem}
          </Text>
        </View>
      </ScrollBottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: 'black',
  },
});
