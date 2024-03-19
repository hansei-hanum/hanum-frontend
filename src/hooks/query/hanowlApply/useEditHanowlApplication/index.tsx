import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();

  const setEditHanowlApplication = useSetRecoilState(editHanowlApplicationAtom);

  return useMutation('useEditHanowlApplication', editHanowlApplication, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries('useGetTemporaryApplication');
      setEditHanowlApplication(data);
    },
  });
};
