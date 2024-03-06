import React, { useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData, TouchableOpacity, View } from 'react-native';
import ModalElement from 'react-native-modal';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { UserLogo } from 'src/assets';
import { Button, Modal, ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString, isIos } from 'src/utils';
import { GetCommentsDetail } from 'src/api';
import { useDeleteComment, useGetUser, useUpdateCommentReaction } from 'src/hooks';
import { articleIdAtom } from 'src/atoms';

import * as S from './styled';

export interface PostCommentCardProps extends GetCommentsDetail {
  index: number;
  isReply?: boolean;
  children?: React.ReactNode;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  id,
  index,
  author,
  createdAt,
  reactions,
  content,
  isReply,
  children,
  attachment,
}) => {
  const { userData } = useGetUser();
  const checkMyComment = userData?.id === author?.id;
  const articleId = useRecoilValue(articleIdAtom);

  const { mutate: updateReactionMutate } = useUpdateCommentReaction();
  const { mutate: deleteCommentMutate, isLoading } = useDeleteComment({
    articleId: articleId ?? 0,
  });

  const theme = useTheme();

  const [isShow, setIsShow] = useState<Array<boolean>>([]);
  const [isOverlay, setIsOverlay] = useState<Array<boolean>>([]);
  const [imageClicked, setImageClicked] = useState<boolean>(false);
  const [commentDeleteModal, setCommentDeleteModal] = useState<boolean>(false);

  const showMore = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const showLess = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = false;
      return temp;
    });
  };

  const overlay = (index: number) => {
    setIsOverlay((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const [reaction, setReaction] = useState<boolean>(false);

  const onLikeClick = (id: number) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setReaction((prev) => !prev);
    articleId && updateReactionMutate({ articleId: articleId, commentId: id });
  };

  const onPressOut = () => {
    if (checkMyComment) {
      setCommentDeleteModal(true);
    }
  };

  const onDeletePress = () => {
    deleteCommentMutate({ articleId: articleId ?? 0, commentId: id });
    if (!isLoading) {
      setCommentDeleteModal(false);
    }
  };

  const likesLength = reactions?.map(({ count }) => count).reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <S.PostCommentCardContainer>
        <View style={{ flex: 1, flexDirection: 'row', columnGap: 6 }}>
          <S.PostCommentCardImage
            source={author && author.picture !== '' ? { uri: author.picture } : UserLogo}
            style={isReply && { width: 36, height: 36 }}
          />
          <View style={{ rowGap: 4, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text size={13}>{author && author.name ? author.name : '익명'}</Text>
              <Text size={13} color={theme.placeholder}>
                {'  '}
                {getPrevTimeString(createdAt)}
              </Text>
            </View>
            <TouchableOpacity onPressOut={onPressOut} activeOpacity={checkMyComment ? 0.6 : 1}>
              {content &&
                (!isShow[index] ? (
                  <S.PostCommentCardCommentContainer>
                    <S.PostCommentCardComment
                      numberOfLines={14}
                      ellipsizeMode="tail"
                      onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
                        event.nativeEvent.lines.length >= 14 && overlay(index);
                      }}
                    >
                      {content.spans?.map(({ text }) => text)}
                    </S.PostCommentCardComment>
                    {isOverlay[index] && (
                      <ScaleOpacity onPress={() => showMore(index)}>
                        <Text size={14} color={theme.placeholder}>
                          더보기
                        </Text>
                      </ScaleOpacity>
                    )}
                  </S.PostCommentCardCommentContainer>
                ) : (
                  <S.PostCommentCardCommentContainer>
                    <S.PostCommentCardComment>
                      {content.spans?.map(({ text }) => text)}
                    </S.PostCommentCardComment>
                    <ScaleOpacity onPress={() => showLess(index)}>
                      <Text size={14} color={theme.placeholder}>
                        간략하게 보기
                      </Text>
                    </ScaleOpacity>
                  </S.PostCommentCardCommentContainer>
                ))}
            </TouchableOpacity>
            {attachment && (
              <ScaleOpacity onPress={() => setImageClicked(true)}>
                <S.PostCommentImage source={{ uri: attachment.thumbnail }} />
                <ModalElement isVisible={imageClicked} backdropOpacity={0.8}>
                  <S.PostCommentImageWrapper
                    onPress={() => setImageClicked(false)}
                    activeOpacity={1}
                  >
                    <S.PostCommentImage
                      source={{ uri: attachment.original }}
                      style={{ width: 300, height: 300 }}
                    />
                  </S.PostCommentImageWrapper>
                </ModalElement>
              </ScaleOpacity>
            )}
            {children}
          </View>
        </View>
        <S.PostCommentCardIconContainer>
          <ScaleOpacity onPress={() => onLikeClick(id)}>
            {reaction ? (
              <MCI name="cards-heart" size={22} color={theme.danger} />
            ) : (
              <MCI name="cards-heart-outline" size={22} color={theme.placeholder} />
            )}
          </ScaleOpacity>
          {likesLength !== 0 ||
            (reaction && (
              <Text size={13} color={theme.placeholder}>
                {reaction ? likesLength + 1 : likesLength}
              </Text>
            ))}
        </S.PostCommentCardIconContainer>
      </S.PostCommentCardContainer>
      <Modal
        modalVisible={commentDeleteModal}
        title="댓글 삭제"
        text={`정말로 댓글을 삭제할까요?\n삭제된 댓글은 다시 복구할 수 없어요`}
        button={
          <Button.Container>
            <Button onPress={() => setCommentDeleteModal(false)} isModalBtn isWhite>
              아니요
            </Button>
            <Button
              onPress={onDeletePress}
              isModalBtn
              backgroundColor={theme.danger}
              isLoading={isLoading}
            >
              네
            </Button>
          </Button.Container>
        }
      />
    </>
  );
};
