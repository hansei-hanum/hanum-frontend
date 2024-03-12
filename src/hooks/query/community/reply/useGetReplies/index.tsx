import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetRepliesResponse, getReplies } from 'src/api';
import { ErrorToast } from 'src/constants';

export interface GetRepliesValues {
  articleId: number | null;
  commentId: number | null;
}

export const useGetReplies = ({
  articleId,
  commentId,
}: GetRepliesValues): UseInfiniteQueryResult<
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
        const message = error.response?.data.message;
        message && ErrorToast(message);
      },
      enabled: !!articleId && !!commentId,
    },
  );
};
