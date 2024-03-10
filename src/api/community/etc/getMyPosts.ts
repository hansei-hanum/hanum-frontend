import { AttachmentType, PaginationItemProps, PaginationType } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from '../post';

export interface GetMyPostsValues {
  scope: LimitedArticleScopeOfDisclosure;
  cursor: number | null;
  limit?: number;
}

export interface GetMyPostsDetail extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments: [AttachmentType];
}

export type GetMyPostsResponse = PaginationType<GetMyPostsDetail>;

export const getMyPosts = async ({ scope, cursor, limit = 10 }: GetMyPostsValues) => {
  setAccessToken('11');
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.MY_ARTICLES}`, {
    params: {
      scope,
      cursor,
      limit,
    },
  });

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
