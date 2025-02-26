import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { EditHanowlApplicationValues, editHanowlApplication } from 'src/api/hanowlApply';

export const useEditHanowlApplication = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIErrorResponse>,
  EditHanowlApplicationValues
> => {
  const queryClient = useQueryClient();

  return useMutation('useEditHanowlApplication', editHanowlApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries('useGetTemporaryApplication');
    },
  });
};
