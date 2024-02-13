import React, { useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData, View } from 'react-native';

import { useTheme } from '@emotion/react';

import { UserLogo } from 'src/assets';
import { ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString } from 'src/utils';

import { CommunityPostProps } from '../../Post';

import * as S from './styled';

export interface PostCommentCardProps extends Pick<CommunityPostProps, 'author' | 'time'> {
  index: number;
  message: string;
  isReply?: boolean;
  children?: React.ReactNode;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  index,
  author,
  time,
  message,
  isReply,
  children,
}) => {
  const [isShow, setIsShow] = useState<Array<boolean>>([]);
  const [isOverlay, setIsOverlay] = useState<Array<boolean>>([]);

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

  const theme = useTheme();
  return (
    <S.PostCommentCardContainer>
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
        {children}
      </View>
    </S.PostCommentCardContainer>
  );
};
