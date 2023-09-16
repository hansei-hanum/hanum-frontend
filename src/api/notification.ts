import { API_SUFFIX, instance } from './api';

export interface ConnectNotificationValue {
  token: string;
  platform: string;
}

export const connectNotification = async ({ token, platform }: ConnectNotificationValue) => {
  const { data } = await instance.post(API_SUFFIX.NOTIFICATION, {
    token,
    platform,
  });
  return data;
};

export const disconnectNotification = async () => {
  const { data } = await instance.delete(API_SUFFIX.NOTIFICATION);
  return data;
};
