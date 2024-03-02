import { useState } from 'react';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { useNavigate } from 'src/hooks';
import { isIos } from 'src/utils';
import { ScaleOpacity, Text } from 'src/components/common';

import * as S from './styled';

export interface PostBottom {
  index: number;
  likesLength: number;
  commentsLength: number;
}

export const PostBottom: React.FC<PostBottom> = ({ index, likesLength, commentsLength }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [likes, setLikes] = useState<Array<boolean>>([]);

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index });
  };

  const onLikeClick = (index: number) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  return (
    <S.PostBottomContainer>
      <ScaleOpacity onPress={() => onLikeClick(index)}>
        <S.PostBottomIconContainer>
          {likes[index] ? (
            <MCI name="cards-heart" size={24} color={theme.danger} />
          ) : (
            <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
          )}
          <Text size={14} color={theme.placeholder}>
            좋아요 {likes[index] ? likesLength + 1 : likesLength}
          </Text>
        </S.PostBottomIconContainer>
      </ScaleOpacity>
      <ScaleOpacity onPress={() => onChatScreenNavigate(index)}>
        <S.PostBottomIconContainer>
          <Icon name="chatbubble-outline" size={22} color={theme.placeholder} />
          <Text size={14} color={theme.placeholder}>
            댓글 {commentsLength}
          </Text>
        </S.PostBottomIconContainer>
      </ScaleOpacity>
    </S.PostBottomContainer>
  );
};
