import { communityInstance, setAccessToken, API_SUFFIX } from 'src/api';

export interface UpdateCommentReactionValues {
  articleId: number;
  commentId: number;
  emoji?: string;
}

export const updateCommentReaction = async ({
  articleId,
  commentId,
  emoji = 'Heart',
}: UpdateCommentReactionValues) => {
  setAccessToken('9');
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
