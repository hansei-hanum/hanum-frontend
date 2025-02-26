import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse } from 'src/api';
import { CreateHanowlApplicationValues, createHanowlApplication } from 'src/api/hanowlApply';
import { hanowlApplyAtom } from 'src/atoms';
import { useInitNavigate } from 'src/hooks/useInitNavigate';

export const useCreateHanowlApplication = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIErrorResponse>,
  CreateHanowlApplicationValues
> => {
  const setHanowlApply = useSetRecoilState(hanowlApplyAtom);
  const { initNavigate } = useInitNavigate();
  const queryClient = useQueryClient();

  return useMutation('useCreateHanowlApplication', createHanowlApplication, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('useGetTemporaryApplication');
      if (variables.isSubmit) {
        setHanowlApply({
          team: { name: '', id: '' },
          aspiration: '',
          introduce: '',
          motive: '',
        });
        Toast.show({
          type: 'success',
          text1: '학생회 신청이 완료되었어요',
        });
        initNavigate('Main');
      }
    },
  });
};
