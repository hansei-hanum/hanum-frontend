import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIResponse, CreateCommentValues, createComment } from 'src/api';

export const useCreateComment = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIResponse<null>>,
  CreateCommentValues
> => {
  return useMutation('useCreateComment', createComment, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      // TODO: 에러 처리 토스트 추가
      console.log('onError', error);
    },
  });
};
