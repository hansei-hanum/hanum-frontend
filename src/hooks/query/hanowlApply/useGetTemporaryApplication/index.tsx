import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { GetTemporaryApplicationResponse, getTemporaryApplication } from 'src/api/hanowlApply';
import { hanowlApplyDataAtom } from 'src/atoms';

export const useGetTemporaryApplication = (): UseQueryResult<
  GetTemporaryApplicationResponse[],
  AxiosError
> => {
  const setHanowlApplyData = useSetRecoilState(hanowlApplyDataAtom);
  return useQuery('useGetTemporaryApplication', getTemporaryApplication, {
    onSuccess: (data) => {
      setHanowlApplyData(data);
    },
    retry: 0,
  });
};
