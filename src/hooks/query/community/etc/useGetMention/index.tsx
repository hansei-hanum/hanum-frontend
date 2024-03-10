import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  GetUserMentionResponse,
  GetUserMentionValue,
  getUserMention,
} from 'src/api';

export const useGetMention = ({
  name,
}: GetUserMentionValue): UseQueryResult<
  APIResponse<GetUserMentionResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery(['getUserMention', name], () => getUserMention({ name }), {
    onSuccess: (data) => {
      console.log('data', data);
    },
    enabled: !!name,
  });
};
