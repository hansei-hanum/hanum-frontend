import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createPost, createPostValues } from 'src/api';

export const useCreatePost = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  APIResponse<any>,
  AxiosError<APIErrorResponse>,
  createPostValues
> => {
  return useMutation('useCreatePost', createPost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      console.log('onError', error);
    },
    retry: 0,
  });
};
