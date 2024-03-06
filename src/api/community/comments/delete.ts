import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface DeleteCommentValues {
  articleId: number;
  commentId: number;
}

export const deleteComment = async ({ articleId, commentId }: DeleteCommentValues) => {
  console.log(articleId, 'articleId', commentId, 'commentId');
  setAccessToken('9');
  const { data } = await communityInstance.delete(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}`,
  );
  return data;
};
