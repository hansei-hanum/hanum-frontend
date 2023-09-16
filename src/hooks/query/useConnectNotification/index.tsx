/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  ConnectNotificationValue,
  connectNotification,
} from 'src/api';

export const useConnectNotification = (): UseMutationResult<
  APIResponse<any>,
  AxiosError<APIErrorResponse>,
  ConnectNotificationValue
> => {
  return useMutation('useConnectNotification', connectNotification, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
