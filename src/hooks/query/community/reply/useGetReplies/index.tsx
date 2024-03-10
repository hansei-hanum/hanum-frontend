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
  isEnable,
}: Pick<GetRepliesValues, 'articleId' | 'commentId' | 'isEnable'>): UseInfiniteQueryResult<
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
        console.log('useGetReplies error', error.response?.data, isEnable, articleId);
        const message = error.response?.data.message;
        message && ErrorToast(message);
      },
      enabled: isEnable ? isEnable : commentId === -1 ? false : false,
    },
  );
};
