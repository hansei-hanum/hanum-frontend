import React, { useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData, View } from 'react-native';
import ModalElement from 'react-native-modal';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { UserLogo } from 'src/assets';
import { ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString, isIos } from 'src/utils';

import { CommunityPostProps } from '../../Post';

import * as S from './styled';

export interface PostCommentCardProps extends Pick<CommunityPostProps, 'author' | 'time'> {
  index: number;
  message: string;
  isReply?: boolean;
  children?: React.ReactNode;
  image?: string;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  index,
  author,
  time,
  message,
  isReply,
  image,
  children,
}) => {
  const theme = useTheme();

  const [isShow, setIsShow] = useState<Array<boolean>>([]);
  const [isOverlay, setIsOverlay] = useState<Array<boolean>>([]);
  const [imageClicked, setImageClicked] = useState<boolean>(false);

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

  const [likes, setLikes] = useState<Array<boolean>>([]);

  const onLikeClick = (index: number) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  const likesLength = likes.filter((like) => like).length;

  return (
    <S.PostCommentCardContainer>
      <View style={{ flex: 1, flexDirection: 'row', columnGap: 6 }}>
        <S.PostCommentCardImage
          source={author.image ? { uri: author.image } : UserLogo}
          style={isReply && { width: 36, height: 36 }}
        />
        <View style={{ rowGap: 4, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text size={13}>{author.name}</Text>
            <Text size={13} color={theme.placeholder}>
              {'  '}
              {getPrevTimeString(time)}
            </Text>
          </View>
          {!isShow[index] ? (
            <S.PostCommentCardCommentContainer>
              <S.PostCommentCardComment
                numberOfLines={14}
                ellipsizeMode="tail"
                onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
                  event.nativeEvent.lines.length >= 14 && overlay(index);
                }}
              >
                {message}
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
              <S.PostCommentCardComment>{message}</S.PostCommentCardComment>
              <ScaleOpacity onPress={() => showLess(index)}>
                <Text size={14} color={theme.placeholder}>
                  간략하게 보기
                </Text>
              </ScaleOpacity>
            </S.PostCommentCardCommentContainer>
          )}
          {image && (
            <ScaleOpacity onPress={() => setImageClicked(true)}>
              <S.PostCommentImage source={{ uri: image }} />
              <ModalElement isVisible={imageClicked} backdropOpacity={0.8}>
                <S.PostCommentImageWrapper onPress={() => setImageClicked(false)} activeOpacity={1}>
                  <S.PostCommentImage source={{ uri: image }} style={{ width: 300, height: 300 }} />
                </S.PostCommentImageWrapper>
              </ModalElement>
            </ScaleOpacity>
          )}
          {children}
        </View>
      </View>
      <S.PostCommentCardIconContainer>
        <ScaleOpacity onPress={() => onLikeClick(index)}>
          {likes[index] ? (
            <MCI name="cards-heart" size={22} color={theme.danger} />
          ) : (
            <MCI name="cards-heart-outline" size={22} color={theme.placeholder} />
          )}
        </ScaleOpacity>
        {likesLength !== 0 && (
          <Text size={13} color={theme.placeholder}>
            {likesLength}
          </Text>
        )}
      </S.PostCommentCardIconContainer>
    </S.PostCommentCardContainer>
  );
};
