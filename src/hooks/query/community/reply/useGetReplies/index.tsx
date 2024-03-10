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
    ({ pageParam = null }) => getReplies({ articleId, cursor: pageParam, commentId }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      onError: (error) => {
        console.log('useGetReplies error', error.response?.data);
        const message = error.response?.data.message;
        message && ErrorToast(message);
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 0,
      enabled: commentId !== -1 && articleId !== -1,
    },
  );
};
