import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIResponse, GetCommentsResponse, GetCommentsValues, getComments } from 'src/api';

export const useGetComments = ({
  articleId,
  page,
  count,
}: GetCommentsValues): UseQueryResult<APIResponse<GetCommentsResponse>, AxiosError> => {
  return useQuery('useGetComments', () => getComments({ articleId, page, count }), {
    onError: (error) => {
      console.log('error', error);
    },
  });
};
