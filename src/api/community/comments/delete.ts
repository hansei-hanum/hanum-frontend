import { communityInstance } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface deleteCommentValues {
  articleId: number;
  commentId: number;
}

export const deleteComment = async ({ articleId, commentId }: deleteCommentValues) => {
  const { data } = await communityInstance.delete(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}`,
  );
  return data;
};
