import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse } from 'src/api';
import { EditHanowlApplicationValues, editHanowlApplication } from 'src/api/hanowlApply';
import { editHanowlApplicationAtom } from 'src/atoms';

export const useEditHanowlApplication = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIErrorResponse>,
  EditHanowlApplicationValues
> => {
  const setEditHanowlApplication = useSetRecoilState(editHanowlApplicationAtom);
  return useMutation('useEditHanowlApplication', editHanowlApplication, {
    onSuccess: ({ data }) => {
      console.log('useEditHanowlApplication data', data);
      setEditHanowlApplication(data);
    },
  });
};
