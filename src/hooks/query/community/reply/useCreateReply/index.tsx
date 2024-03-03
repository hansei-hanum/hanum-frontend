import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createReply, createReplyValues } from 'src/api';

export const useCreateReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  createReplyValues
> => {
  return useMutation('useCreateReply', createReply, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      // TODO: 에러 처리 토스트 추가
      console.log('onError', error);
    },
  });
};
