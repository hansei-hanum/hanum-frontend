import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  GetPostByIdResponse,
  GetPostByIdValue,
  getPostById,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetPostById = ({
  articleId,
}: GetPostByIdValue): UseQueryResult<
  APIResponse<GetPostByIdResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetPostById', () => getPostById({ articleId }), {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
