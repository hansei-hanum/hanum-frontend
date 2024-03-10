import {
  communityInstance,
  setAccessToken,
  API_SUFFIX,
  UpdateCommentReactionValues,
} from 'src/api';

export interface UpdateReplyReactionValues extends UpdateCommentReactionValues {
  replyId: number;
}

export const updateReplyReaction = async ({
  articleId,
  commentId,
  replyId,
  emoji,
}: UpdateReplyReactionValues) => {
  setAccessToken('11');
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies/${replyId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
