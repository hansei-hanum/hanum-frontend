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
  setAccessToken('11');
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
