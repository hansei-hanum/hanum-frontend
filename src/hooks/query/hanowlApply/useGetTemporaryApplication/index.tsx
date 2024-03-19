import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { GetTemporaryApplicationResponse, getTemporaryApplication } from 'src/api/hanowlApply';
import { hanowlApplyDataAtom } from 'src/atoms';
import { APIErrorResponse, APIResponse } from 'src/api';

export const useGetTemporaryApplication = (): UseQueryResult<
  APIResponse<GetTemporaryApplicationResponse>,
  AxiosError<APIErrorResponse>
> => {
  const setHanowlApplyData = useSetRecoilState(hanowlApplyDataAtom);
  return useQuery('useGetTemporaryApplication', getTemporaryApplication, {
    onSuccess: ({ data }) => {
      setHanowlApplyData(data.items);
    },
    retry: 0,
  });
};
