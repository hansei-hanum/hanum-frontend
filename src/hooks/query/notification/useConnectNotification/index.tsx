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
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ConnectNotificationValue
> => {
  return useMutation('useConnectNotification', connectNotification, {
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
