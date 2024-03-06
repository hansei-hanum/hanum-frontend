import React, { useCallback, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@emotion/react';

import {
  AnimatedHoc,
  CommunityPostHeader,
  CommunityUserImage,
  Header,
  ReplyBox,
  ScaleOpacity,
  Text,
  PostDetailLayout,
  MentionUserList,
  ImageListBottomSheet,
  PostOptionBottomSheet,
  PhotoCard,
  PhotosInterface,
  CommunityMineBottomSheet,
  Spinner,
} from 'src/components';
import {
  CHECK_IF_THE_STRING_HAS_SPACE_AFTER_AT,
  COMMUNITY_BOTTOM_SHEET_HEIGHT,
  COMMUNITY_POST,
} from 'src/constants';
import {
  useBottomSheet,
  useCheckPhotoPermission,
  useCreateComment,
  useGetComments,
  useGetUser,
} from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';
import { isAndroid } from 'src/utils';
import { RootStackParamList } from 'src/types/stackParams';

import * as S from './styled';

export interface selectedPhotosInterface {
  uri: string;
  name: string;
}

export interface PhotoPermissionProps {
  granted: boolean;
  limited: boolean;
}

export type CommunityPostDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'CommunityPostDetail'
>;

export const CommunityPostDetailScreen: React.FC<CommunityPostDetailScreenProps> = ({ route }) => {
  const { isEdit } = route.params;

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const inset = useSafeAreaInsets();

  const ImageListBottomSheetRef = useRef<BottomSheetRefProps>(null);
  const commentInputRef = useRef<TextInput>(null);

  const { checkPhotoPermission, permissionHeight, permission } = useCheckPhotoPermission({
    ImageListBottomSheetRef,
    commentInputRef,
  });

  const handlePresentModalPress = useCallback(() => {
    setDoneCheck(false);
    checkPhotoPermission();
  }, []);

  const { userProfile } = useGetUser();

  const [comment, setComment] = useState<string>('');
  const [mentionListOpen, setMentionListOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isReplyChat, setIsReplyChat] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotosInterface | null>(null);
  const [doneCheck, setDoneCheck] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const {
    data,
    isLoading: isGetCommentsLoading,
    fetchNextPage,
    isFetching,
  } = useGetComments({
    articleId: 64,
  });

  const { mutate: createCommentMutate, isLoading: createCommentLoading } = useCreateComment();

  const theme = useTheme();

  const onChangeText = (text: string) => {
    setComment(text);
    commentInputRef.current?.focus();
    if (!mentionListOpen && comment.includes('@')) {
      setMentionListOpen(true);
    }
  };

  const onCommentInputBlur = () => {
    setComment('');
    setIsReplyChat(false);
    setIsAnonymous(false);
  };

  const onMention = (id: string, isReply?: boolean) => {
    setUserId(id);
    onChangeText(`${comment.split('@').slice(0, -1).join('@')}@${id} `);
    setMentionListOpen(false);
    if (isReply) setIsReplyChat(true);
  };

  const sendChat = () => {
    createCommentMutate({
      articleId: 64,
      isAnonymous,
      content: comment,
      attachment: photo,
    });
    setComment('');
    setPhoto(null);
    commentInputRef.current?.blur();
  };

  const closeReplyBox = () => {
    setIsReplyChat(false);
    setComment('');
  };

  const openPostBottomSheet = () => {
    if (isEdit) {
      bottomSheetRef.current?.scrollTo(-height);
    } else {
      commentInputRef.current?.blur();
      openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT });
    }
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
    Toast.show({
      position: 'top',
      type: 'success',
      text1: `${!isAnonymous ? '익명' : '실명'}으로 전환되었어요`,
      topOffset: isAndroid ? inset.top + 10 : inset.top,
    });
  };

  const onCommentInputFocus = async () => {
    const checkTutorial = await AsyncStorage.getItem('checkTutorial');
    if (checkTutorial === 'true') {
      return;
    } else {
      Toast.show({
        position: 'top',
        type: 'info',
        text1: '프로필을 누르면 익명으로 전환돼요!',
        topOffset: isAndroid ? inset.top + 10 : inset.top,
      });
      await AsyncStorage.setItem('checkTutorial', 'true');
    }
  };

  const onPhotoPress = () => {
    setPhoto(null);
  };

  return (
    <S.PostDetailContainer style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <Header
        isRow
        style={{ borderBottomColor: theme.lightGray, borderBottomWidth: 1, zIndex: -11 }}
        hasGoBackIcon
      >
        <CommunityPostHeader
          {...COMMUNITY_POST}
          style={{ flex: 1 }}
          openBottomSheet={openPostBottomSheet}
        />
      </Header>
      <S.PostDetailInnerContainer behavior="padding" keyboardVerticalOffset={10}>
        {!mentionListOpen || !CHECK_IF_THE_STRING_HAS_SPACE_AFTER_AT.test(comment) ? (
          <PostDetailLayout
            onEndReached={() => fetchNextPage()}
            onMention={onMention}
            data={data?.pages}
            isLoading={isGetCommentsLoading || isFetching}
          />
        ) : (
          <View style={{ width: '100%', flex: 1 }}>
            {comment.length < 2 ? (
              <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
                @뒤에 유저 이름을 써주세요
              </Text>
            ) : (
              <MentionUserList onMention={onMention} />
            )}
          </View>
        )}
        <S.PostDetailBottomSection>
          {photo && (
            <View
              style={{
                flexDirection: 'row',
                columnGap: 4,
                paddingRight: 14,
                marginVertical: 10,
              }}
            >
              <PhotoCard item={photo.uri} onPress={onPhotoPress} />
            </View>
          )}
          <AnimatedHoc isOpen={isReplyChat}>
            <ReplyBox closeReplyBox={closeReplyBox} userId={userId} />
          </AnimatedHoc>
          <S.PostDetailCommentContainer>
            <ScaleOpacity onPress={toggleAnonymous}>
              <CommunityUserImage userImage={userProfile} />
            </ScaleOpacity>
            <S.PostDetailCommentIconContainer>
              <S.PostDetailCommentInput
                placeholder="댓글을 입력하세요"
                placeholderTextColor={theme.placeholder}
                ref={commentInputRef}
                value={comment}
                onChangeText={onChangeText}
                onBlur={onCommentInputBlur}
                onFocus={onCommentInputFocus}
              />
              {createCommentLoading ? (
                <Spinner />
              ) : comment.length > 0 || photo ? (
                <ScaleOpacity onPress={sendChat}>
                  <MI name="send" size={28} color={theme.primary} />
                </ScaleOpacity>
              ) : (
                <ScaleOpacity onPress={handlePresentModalPress}>
                  <FI name="image" size={28} color={theme.default} />
                </ScaleOpacity>
              )}
            </S.PostDetailCommentIconContainer>
          </S.PostDetailCommentContainer>
        </S.PostDetailBottomSection>
      </S.PostDetailInnerContainer>
      <ImageListBottomSheet
        ref={ImageListBottomSheetRef}
        setPhoto={setPhoto}
        setDoneCheck={setDoneCheck}
        photo={photo}
        scrollHeight={permissionHeight}
        permission={permission}
        doneCheck={doneCheck}
      />
      {isEdit ? (
        <CommunityMineBottomSheet
          ref={bottomSheetRef}
          setHeight={setHeight}
          height={height}
          closeBottomSheet={closeBottomSheet}
        />
      ) : (
        <PostOptionBottomSheet
          bottomSheetRef={bottomSheetRef}
          closeBottomSheet={closeBottomSheet}
        />
      )}
    </S.PostDetailContainer>
  );
};
