import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { CreateHanowlApplicationValues, createHanowlApplication } from 'src/api/hanowlApply';
import { useNavigate } from 'src/hooks/useNavigate';

export const useCreateHanowlApplication = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIErrorResponse>,
  CreateHanowlApplicationValues
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation('useCreateHanowlApplication', createHanowlApplication, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('useGetTemporaryApplication');
      if (variables.isSubmit) {
        Toast.show({
          type: 'success',
          text1: '학생회 신청이 완료되었어요',
        });
        navigate('Main');
      }
    },
  });
};