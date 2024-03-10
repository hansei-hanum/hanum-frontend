import { AttachmentType, PaginationItemProps, PaginationType } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from './create';
import { GetPostsValues } from './get';

export interface SearchPostsValues extends GetPostsValues {
  query: string;
}

export interface SearchPostsDetail extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments: [AttachmentType];
}

export type SearchPostsResponse = PaginationType<SearchPostsDetail>;

export const searchPosts = async ({ query, scope, cursor, limit = 10 }: SearchPostsValues) => {
  setAccessToken('11');
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.BASE_URL}/search`, {
    params: {
      query,
      scope,
      cursor,
      limit,
    },
  });

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
