import { useState } from 'react';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { useNavigate, useUpdatePostReactions } from 'src/hooks';
import { isIos } from 'src/utils';
import { ScaleOpacity, Text } from 'src/components/common';

import * as S from './styled';

export interface PostBottom {
  id: number;
  likesLength: number;
  commentCount: number;
}

export const PostBottom: React.FC<PostBottom> = ({ id, likesLength, commentCount }) => {
  const { mutate } = useUpdatePostReactions();
  const navigate = useNavigate();
  const theme = useTheme();

  const [likes, setLikes] = useState<Array<boolean>>([]);

  const onChatScreenNavigate = () => {
    navigate('CommunityPostDetail', { id, isEdit: false });
  };

  const onLikeClick = (id: number) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[id] = !newLikes[id];
      return newLikes;
    });
    mutate({ articleId: id });
  };

  return (
    <S.PostBottomContainer>
      <ScaleOpacity onPress={() => onLikeClick(id)}>
        <S.PostBottomIconContainer>
          {likes[id] ? (
            <MCI name="cards-heart" size={24} color={theme.danger} />
          ) : (
            <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
          )}
          <Text size={14} color={theme.placeholder}>
            좋아요 {likes[id] ? likesLength + 1 : likesLength}
          </Text>
        </S.PostBottomIconContainer>
      </ScaleOpacity>
      <ScaleOpacity onPress={onChatScreenNavigate}>
        <S.PostBottomIconContainer>
          <Icon name="chatbubble-outline" size={22} color={theme.placeholder} />
          <Text size={14} color={theme.placeholder}>
            댓글 {commentCount}
          </Text>
        </S.PostBottomIconContainer>
      </ScaleOpacity>
    </S.PostBottomContainer>
  );
};
