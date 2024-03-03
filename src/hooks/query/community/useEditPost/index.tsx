import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { editPost, editPostValues } from 'src/api/community/editPost';

export const useEditPost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  editPostValues
> => {
  return useMutation('useEditPost', editPost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      console.log('onError', error);
    },
    retry: 0,
  });
};
