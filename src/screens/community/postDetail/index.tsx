import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import {
  AnimatedHoc,
  CommunityPostHeader,
  CommunityUserImage,
  Header,
  ReplyBox,
  Text,
  PostDetailLayout,
  MentionUserList,
  ImageListBottomSheet,
  PostOptionBottomSheet,
  PhotoCard,
  PhotosInterface,
  CommunityMineBottomSheet,
  Spinner,
  ScaleOpacity,
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
  useCreateReply,
  useGetComments,
  useGetReplies,
  useGetUser,
} from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';
import { isAndroid } from 'src/utils';
import { RootStackParamList } from 'src/types/stackParams';
import { articleIdAtom } from 'src/atoms';

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

const articleId = 87;

export const CommunityPostDetailScreen: React.FC<CommunityPostDetailScreenProps> = ({ route }) => {
  const { isEdit } = route.params;

  const {
    data,
    isLoading: isGetCommentsLoading,
    isFetching: isFetchingComments,
    fetchNextPage,
    refetch,
  } = useGetComments({
    articleId,
  });

  const {
    mutate: createCommentMutate,
    isLoading: isCreateCommentLoading,
    isSuccess: isCreateCommentSuccess,
  } = useCreateComment();

  const {
    mutate: createReplyMutate,
    isLoading: isCreateReplyLoading,
    isSuccess: isCreateReplySuccess,
  } = useCreateReply();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const setArticleId = useSetRecoilState(articleIdAtom);

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
  const [commentId, setCommentId] = useState<number | null>(null);
  const [photo, setPhoto] = useState<PhotosInterface | null>(null);
  const [doneCheck, setDoneCheck] = useState<boolean>(false);
  const [openReplyBox, setOpenReplyBox] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const {
    data: repliesData,
    isLoading: repliesLoading,
    refetch: refetchReplies,
  } = useGetReplies({
    articleId,
    commentId: commentId || -1,
  });

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
    setCommentId(null);
    setIsAnonymous(false);
  };

  const onMention = (id: string, commentId?: number) => {
    setOpenReplyBox(true);
    setUserId(id);
    onChangeText(`${comment.split('@').slice(0, -1).join('@')}@${id} `);
    setMentionListOpen(false);
    if (commentId) setCommentId(commentId);
  };

  const sendChat = () => {
    if (!commentId) {
      createCommentMutate({
        articleId,
        isAnonymous,
        content: comment,
        attachment: photo,
      });
    } else {
      createReplyMutate({
        articleId,
        commentId,
        isAnonymous,
        content: comment,
        attachment: photo,
      });
    }
    if (!isCreateReplyLoading && !isCreateCommentLoading) {
      setOpenReplyBox(false);
      setComment('');
      setPhoto(null);
      commentInputRef.current?.blur();
    }
  };

  const closeReplyBox = () => {
    setOpenReplyBox(false);
    setCommentId(null);
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

  const onEndReached = () => {
    if (data && data?.pages[data.pages.length - 1].data.nextCursor) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isCreateCommentSuccess || isCreateReplySuccess) {
      refetch();
      refetchReplies();
    }
  }, [isCreateCommentLoading, isCreateReplyLoading]);

  const isFocused = useIsFocused();
  useEffect(() => {
    setArticleId(articleId);
  }, [isFocused]);

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
            setCommentId={setCommentId}
            onEndReached={onEndReached}
            onMention={onMention}
            data={data?.pages}
            isLoading={isGetCommentsLoading || isFetchingComments}
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
          <AnimatedHoc isOpen={openReplyBox}>
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
              {isCreateCommentLoading || isCreateReplyLoading ? (
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
