import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteReplyValues, deleteReply } from 'src/api';

export const useDeleteReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteReplyValues
> => {
  return useMutation('useDeleteReply', deleteReply, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      // TODO: 에러 처리 토스트 추가
      console.log('onError', error);
    },
  });
};
