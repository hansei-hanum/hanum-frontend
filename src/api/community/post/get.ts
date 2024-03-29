import AsyncStorage from '@react-native-async-storage/async-storage';

import { AttachmentType, PaginationItemProps, PaginationType } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from './create';

export interface GetPostsValues {
  scope: LimitedArticleScopeOfDisclosure | null;
  cursor: number | null;
  limit?: number;
}

export interface GetPostsDetail extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure | null;
  attachments: [AttachmentType];
}

export type GetPostsResponse = PaginationType<GetPostsDetail>;

export const getPosts = async ({ scope, cursor, limit = 10 }: GetPostsValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.BASE_URL}`, {
    params: {
      scope,
      cursor,
      limit,
    },
  });

  const nextPage = data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
