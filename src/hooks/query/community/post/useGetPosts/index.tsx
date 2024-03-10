import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetPostsResponse, GetPostsValues, getPosts } from 'src/api';
import { ErrorToast } from 'src/constants';

/**
 *
 * @param scope
 * 공개 범위를 설정합니다 (LimitedArticleScopeOfDisclosure)
 * @param cursor
 * 페이지네이션을 위한 커서값을 설정합니다 (기본값은 null)
 * @returns
 */
export const useGetPosts = ({
  scope,
  cursor,
}: Exclude<GetPostsValues, 'limit'>): UseInfiniteQueryResult<
  APIResponse<GetPostsResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useInfiniteQuery(
    ['useGetPosts', scope, cursor],
    ({ pageParam = cursor }) => getPosts({ scope, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      onError: (error) => {
        const message = error.response?.data.message;
        message && ErrorToast(message);
      },
      retry: 0,
    },
  );
};
