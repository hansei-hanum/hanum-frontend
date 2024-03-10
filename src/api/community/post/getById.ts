import { AttachmentType, PaginationItemProps } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from './create';

export interface GetPostByIdValue {
  articleId: number;
}

export interface GetPostByIdResponse extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments: [AttachmentType];
}

export const getPostById = async ({ articleId }: GetPostByIdValue) => {
  setAccessToken('11');
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}`);

  return data;
};
