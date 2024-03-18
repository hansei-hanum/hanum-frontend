import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { GetTemporaryApplicationResponse, getTemporaryApplication } from 'src/api/hanowlApply';

export const UseGetTemporaryApplication = (): UseQueryResult<
  GetTemporaryApplicationResponse,
  AxiosError
> => {
  return useQuery('UseGetTemporaryApplication', getTemporaryApplication, {
    retry: 0,
  });
};
