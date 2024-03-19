import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetHanowlTeamsResponse, getHanowlTeams } from 'src/api/hanowlApply';

export const useGetHanowlTeams = (): UseQueryResult<
  APIResponse<GetHanowlTeamsResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetHanowlTeams', getHanowlTeams, {
    retry: 0,
  });
};
