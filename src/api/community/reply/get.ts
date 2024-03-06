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

export const getReplies = async ({ articleId, commentId, page, count = 10 }: GetRepliesValues) => {
  console.log('getReplies', articleId, commentId, page, count);
  setAccessToken('9');
  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies`,
    {
      params: {
        page,
        count,
      },
    },
  );

  const nextPage = data.data.page < data.data.totalPage ? data.data.page + 1 : undefined;

  return { ...data, nextPage };
};
