import { AttachmentType, PaginationItemProps, PaginationType } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from './create';

export interface GetPostsValues {
  scope: LimitedArticleScopeOfDisclosure;
  cursor: number | null;
  limit?: number;
}

export interface GetPostsDetail extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments: [AttachmentType];
}

export type GetPostsResponse = PaginationType<GetPostsDetail>;

export const getPosts = async ({ scope, cursor, limit = 10 }: GetPostsValues) => {
  setAccessToken('11');
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.BASE_URL}`, {
    params: {
      scope,
      cursor,
      limit,
    },
  });

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
