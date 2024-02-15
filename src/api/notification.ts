import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_SUFFIX, authInstance } from './api';

export interface ConnectNotificationValue {
  token: string;
  platform: string;
}

export const connectNotification = async ({ token, platform }: ConnectNotificationValue) => {
  const { data } = await authInstance.post(API_SUFFIX.NOTIFICATION, {
    token,
    platform,
  });
  return data;
};

export const disconnectNotification = async () => {
  await authInstance.delete(API_SUFFIX.NOTIFICATION);
  await AsyncStorage.removeItem('token');
  console.log('토큰 삭제');
};
