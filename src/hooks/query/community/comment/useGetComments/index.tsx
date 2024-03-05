import { UseQueryResult, useQuery } from 'react-query';

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
  page,
  count,
}: GetCommentsValues): UseQueryResult<
  APIResponse<GetCommentsResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetComments', () => getComments({ articleId, page, count }), {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
