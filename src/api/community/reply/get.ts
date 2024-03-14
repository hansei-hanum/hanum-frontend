import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PaginationItemProps, PaginationType } from 'src/types';

import { GetCommentsValues } from '../comments';

export interface GetRepliesValues extends GetCommentsValues {
  commentId: number | null;
}

export interface GetRepliesDetail {
  id: number;
  isAnonymous: boolean;
}

export interface GetRepliesDetail extends PaginationItemProps {
  parentId: number;
}

export type GetRepliesResponse = PaginationType<GetRepliesDetail>;

export const getReplies = async ({
  articleId,
  commentId,
  cursor = null,
  limit = 10,
}: GetRepliesValues) => {
  if (!articleId || !commentId) return null;

  const token = await AsyncStorage.getItem('token');

  setAccessToken(token);

  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies`,
    {
      params: {
        cursor,
        limit,
      },
    },
  );

  const nextPage = data.data.nextCursor;

  return { ...data, nextPage };
};
