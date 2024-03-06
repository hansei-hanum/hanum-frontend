import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  GetRepliesResponse,
  GetRepliesValues,
  getReplies,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetReplies = ({
  articleId,
  commentId,
}: Pick<GetRepliesValues, 'articleId' | 'commentId'>): UseInfiniteQueryResult<
  APIResponse<GetRepliesResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useInfiniteQuery(
    ['useGetReplies', articleId, commentId],
    ({ pageParam = 1 }) => getReplies({ articleId, page: pageParam, commentId }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      onError: (error) => {
        const message = error.response?.data.message;
        ErrorToast(message);
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 0,
      enabled: commentId !== -1,
    },
  );
};
