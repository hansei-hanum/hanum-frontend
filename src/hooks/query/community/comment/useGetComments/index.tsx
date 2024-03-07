import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  GetCommentsResponse,
  GetCommentsValues,
  getComments,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetComments = ({
  articleId,
}: Pick<GetCommentsValues, 'articleId'>): UseInfiniteQueryResult<
  APIResponse<GetCommentsResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useInfiniteQuery(
    ['getComments', articleId],
    ({ pageParam = null }) => getComments({ articleId, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      onError: (error) => {
        const message = error.response?.data.message;
        message && ErrorToast(message);
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 0,
    },
  );
};
