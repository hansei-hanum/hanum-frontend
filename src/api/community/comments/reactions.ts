import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken, API_SUFFIX } from 'src/api';

export interface UpdateCommentReactionValues {
  articleId: number;
  commentId: number;
  emoji: string | null;
}

export const updateCommentReaction = async ({
  articleId,
  commentId,
  emoji,
}: UpdateCommentReactionValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
