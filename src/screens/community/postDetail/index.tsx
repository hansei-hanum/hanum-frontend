import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';

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
  PostOptionBottomSheet,
  PhotoCard,
  PhotosInterface,
  CommunityMineBottomSheet,
  Spinner,
  ScaleOpacity,
  CommunityPostDetailSkeleton,
} from 'src/components';
import {
  CHECK_IF_THE_STRING_HAS_SPACE_AFTER_AT,
  COMMUNITY_BOTTOM_SHEET_HEIGHT,
} from 'src/constants';
import {
  useBottomSheet,
  useCreateComment,
  useCreateReply,
  useDebounce,
  useGetComments,
  useGetMention,
  useGetPostById,
  useGetReplies,
  useGetUser,
} from 'src/hooks';
import { formattedMention, isAndroid } from 'src/utils';
import { RootStackParamList } from 'src/types/stackParams';
import { articleIdAtom } from 'src/atoms';

import * as S from './styled';

export interface onTagProps {
  userName?: string;
  commentId?: number;
  isReply?: boolean;
}

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
  const { isEdit, id } = route.params;

  const { data: postData, isLoading: isPostLoading } = useGetPostById({ articleId: id });

  const {
    data: commentsData,
    isLoading: isGetCommentsLoading,
    fetchNextPage,
    refetch,
    isFetching: isFetchingComments,
  } = useGetComments({
    articleId: id,
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

  const commentInputRef = useRef<TextInput>(null);

  const { userProfile } = useGetUser();

  const [comment, setComment] = useState<string>('');
  const [mentionListOpen, setMentionListOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [photo, setPhoto] = useState<PhotosInterface | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<boolean>(false);
  const [users, setUsers] = useState({});
  const [mentionSearch, setMentionSearch] = useState<string>('');
  const [targetId, setTargetId] = useState<number | null>(null);

  const { debouncedValue } = useDebounce(mentionSearch, 300);

  const { data: mentionData, isLoading: isGetMentionLoading } = useGetMention({
    name: debouncedValue,
  });

  const { refetch: replyRefetch } = useGetReplies({
    articleId: id,
    commentId: commentId,
  });

  const handlePresentModalPress = () => {
    if (photo) {
      Toast.show({ type: 'error', text1: '댓글 이미지는 1장까지만 업로드 가능해요' });
      return;
    } else {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
        selectionLimit: 1,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets) {
          const imageUri = response.assets.map((item) => item.uri);
          const imageName = response.assets.map((item) => item.fileName);
          const imageType = response.assets.map((item) => item.type);
          if (imageUri && imageName && imageType) {
            const image = {
              uri: imageUri[0],
              name: imageName[0],
              type: imageType[0],
            };
            setPhoto({
              uri: image.uri as string,
              name: image.name as string,
              type: image.type as string,
            });
          }
        }
      });
    }
  };
  const theme = useTheme();

  const onChangeText = (text: string) => {
    setComment(text);
    if (!mentionListOpen && comment.includes('@')) {
      commentInputRef.current?.focus();
      setMentionListOpen(true);
    }
    if (mentionListOpen && CHECK_IF_THE_STRING_HAS_SPACE_AFTER_AT.test(comment)) {
      setMentionSearch(text.split('@').slice(-1)[0]);
    }
  };

  const onCommentInputBlur = () => {
    setComment('');
    setCommentId(null);
    setIsAnonymous(false);
    setMentionListOpen(false);
    setOpenReplyBox(false);
  };

  const onTag = ({ userName, isReply, commentId }: onTagProps) => {
    if (userName) {
      isReply && setOpenReplyBox(true);
      commentInputRef.current?.focus();
      setUserName(userName);
      onChangeText(`${comment.split('@').slice(0, -1).join('@')}@${userName} `);
      setMentionListOpen(false);
    } else {
      Toast.show({
        type: 'info',
        text1: '익명 유저는 언급할 수 없어요',
      });
    }
    if (commentId) setCommentId(commentId);
  };

  const sendChat = () => {
    const inputString = comment;
    const regex = /@[가-힣]+/g;

    const outputString = inputString.replace(regex, (match) => {
      const userName = match.substring(1);
      return `@${users[userName as keyof typeof users]}`;
    });

    const formattedComment = formattedMention(outputString);
    if (!commentId) {
      createCommentMutate({
        articleId: id,
        isAnonymous,
        content: formattedComment,
        attachment: photo,
      });
    } else {
      createReplyMutate({
        articleId: id,
        commentId,
        isAnonymous,
        content: formattedComment,
        attachment: photo,
      });
    }
    setOpenReplyBox(false);
    setComment('');
    setPhoto(null);
    commentInputRef.current?.blur();
  };

  const closeReplyBox = () => {
    setOpenReplyBox(false);
    setCommentId(null);
    setComment('');
  };

  const openPostBottomSheet = (id?: number, name?: string) => {
    if (isEdit) {
      bottomSheetRef.current?.scrollTo(COMMUNITY_BOTTOM_SHEET_HEIGHT);
    } else {
      if (!id || !name) {
        Toast.show({
          type: 'info',
          text1: '익명 사용자는 차단할 수 없어요',
        });
        return;
      }
      setTargetId(id);
      setUserName(name);
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
    const lastPage = commentsData?.pages[commentsData.pages.length - 1].data;
    if (lastPage && lastPage.nextCursor) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isCreateCommentSuccess || isCreateReplySuccess) {
      replyRefetch();
      refetch();
    }
  }, [isCreateCommentLoading, isCreateReplyLoading]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setArticleId(id);
    }
    console.log('commentsData', commentsData);
    if (commentsData) {
      const newUsers: { [key: string]: number } = { ...users };
      commentsData.pages.map(({ data }) => {
        data.items.map(({ author }) => {
          if (author) {
            newUsers[author.name] = author.id;
          }
        });
      });
      setUsers(newUsers);
    }
  }, [isFocused, isGetCommentsLoading, commentsData]);

  useEffect(() => {
    if (mentionData) {
      mentionData.data.items.map(({ name, id }) => {
        setUsers((prev) => ({ ...prev, [name]: id }));
      });
    }
  }, [mentionData, isGetMentionLoading]);

  return (
    <S.PostDetailContainer style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <Header
        isRow
        style={{
          borderBottomColor: theme.lightGray,
          borderBottomWidth: 1,
          zIndex: -11,
          paddingHorizontal: 10,
        }}
        hasGoBackIcon
      >
        {!isPostLoading && postData ? (
          <CommunityPostHeader
            authorName={postData.data.authorName}
            style={{ flex: 1, paddingRight: 4 }}
            author={postData.data.author}
            scopeOfDisclosure={postData.data.scopeOfDisclosure}
            createdAt={postData.data.createdAt}
            openBottomSheet={() =>
              openPostBottomSheet(postData.data.author?.id, postData.data.author?.name)
            }
          />
        ) : (
          <CommunityPostDetailSkeleton.Header />
        )}
      </Header>
      <S.PostDetailInnerContainer behavior="padding" keyboardVerticalOffset={10}>
        {!mentionListOpen || !CHECK_IF_THE_STRING_HAS_SPACE_AFTER_AT.test(comment) ? (
          isGetCommentsLoading || isPostLoading ? (
            <CommunityPostDetailSkeleton.Content />
          ) : (
            <PostDetailLayout
              setCommentId={setCommentId}
              onEndReached={onEndReached}
              onTag={onTag}
              commentsData={commentsData?.pages}
              isLoading={isGetCommentsLoading || isFetchingComments}
              postData={postData?.data}
              isPostLoading={isPostLoading}
            />
          )
        ) : (
          <View style={{ width: '100%', flex: 1 }}>
            {comment.length < 2 ? (
              <Text size={16} style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
                @뒤에 유저 이름을 써주세요
              </Text>
            ) : (
              <MentionUserList onTag={onTag} isLoading={isGetMentionLoading} data={mentionData} />
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
            <ReplyBox closeReplyBox={closeReplyBox} userName={userName} />
          </AnimatedHoc>
          <S.PostDetailCommentContainer>
            <ScaleOpacity onPress={toggleAnonymous}>
              <CommunityUserImage userImage={userProfile} />
            </ScaleOpacity>
            <S.PostDetailCommentIconContainer
              style={{ borderRadius: comment.length > 0 ? 20 : 40 }}
            >
              <S.PostDetailCommentInput
                multiline
                numberOfLines={5}
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
      {isEdit ? (
        <CommunityMineBottomSheet
          ref={bottomSheetRef}
          closeBottomSheet={closeBottomSheet}
          postId={id}
        />
      ) : (
        <PostOptionBottomSheet
          userName={userName}
          targetId={targetId}
          bottomSheetRef={bottomSheetRef}
          closeBottomSheet={closeBottomSheet}
        />
      )}
    </S.PostDetailContainer>
  );
};
