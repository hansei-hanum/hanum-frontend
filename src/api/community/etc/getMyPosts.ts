import AsyncStorage from '@react-native-async-storage/async-storage';

import { AttachmentType, PaginationItemProps, PaginationType } from 'src/types';
import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { LimitedArticleScopeOfDisclosure } from '../post';

export interface GetMyPostsValues {
  cursor: number | null;
  limit?: number;
}

export interface GetMyPostsDetail extends Exclude<PaginationItemProps, 'attachment'> {
  commentCount: number;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments: [AttachmentType];
}

export type GetMyPostsResponse = PaginationType<GetMyPostsDetail>;

export const getMyPosts = async ({ cursor, limit = 10 }: GetMyPostsValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.MY_ARTICLES}`, {
    params: {
      cursor,
      limit,
    },
  });

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
