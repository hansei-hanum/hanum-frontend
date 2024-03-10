import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  SearchPostsResponse,
  SearchPostsValues,
  searchPosts,
} from 'src/api';

/**
 *
 * @param scope
 * 공개 범위를 설정합니다 (LimitedArticleScopeOfDisclosure)
 * @param cursor
 * 페이지네이션을 위한 커서값을 설정합니다 (기본값은 null)
 * @param query
 * 검색어를 설정합니다
 * @returns
 */
export const useSearchPosts = ({
  scope,
  cursor,
  query,
}: Exclude<SearchPostsValues, 'limit'>): UseInfiniteQueryResult<
  APIResponse<SearchPostsResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useInfiniteQuery(
    ['useSearchPosts', scope, cursor, query],
    ({ pageParam = cursor }) => searchPosts({ scope, cursor: pageParam, query }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      retry: 0,
      enabled: !!query,
    },
  );
};
