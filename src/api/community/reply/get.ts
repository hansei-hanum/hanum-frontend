import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PaginationType } from 'src/types';

import { GetCommentsDetail, GetCommentsValues } from '../comments';

export interface GetRepliesValues extends GetCommentsValues {
  commentId: number;
}

export interface GetRepliesDetail {
  id: number;
  isAnonymous: boolean;
}

export interface GetRepliesDetail extends Exclude<GetCommentsDetail, 'replyCount'> {
  parentId: number;
}

export type GetRepliesResponse = PaginationType<GetRepliesDetail>;

export const getReplies = async ({
  articleId,
  commentId,
  cursor = null,
  limit = 10,
}: GetRepliesValues) => {
  setAccessToken('9');
  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies`,
    {
      params: {
        cursor,
        limit,
      },
    },
  );

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
