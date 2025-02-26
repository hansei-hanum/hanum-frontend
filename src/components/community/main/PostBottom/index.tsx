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
  commentCount: number;
  reactions: {
    emoji: string;
    count: number;
    isReacted: boolean;
  }[];
}

export const PostBottom: React.FC<PostBottom> = ({ id, reactions, commentCount }) => {
  const { mutate } = useUpdatePostReactions();
  const navigate = useNavigate();
  const theme = useTheme();

  const reactedCount = reactions.filter(({ isReacted }) => isReacted).length;
  const [reaction, setReaction] = useState<boolean>(reactedCount >= 1 ? true : false);
  const [likes, setLikes] = useState<number>(
    reactions?.map(({ count }) => count).reduce((acc, cur) => acc + cur, 0),
  );

  const onChatScreenNavigate = () => {
    navigate('CommunityPostDetail', { id });
  };

  const onLikeClick = (id: number) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setReaction((prev) => !prev);
    setLikes((prev) => (reaction ? prev - 1 : prev + 1));
    mutate({ articleId: id });
  };

  return (
    <S.PostBottomContainer>
      <ScaleOpacity onPress={() => onLikeClick(id)}>
        <S.PostBottomIconContainer>
          {reaction ? (
            <MCI name="cards-heart" size={24} color={theme.danger} />
          ) : (
            <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
          )}
          <Text size={14} color={theme.placeholder}>
            좋아요 {likes}
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
