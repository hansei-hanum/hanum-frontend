import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, API_SUFFIX, setAccessToken } from 'src/api';

export interface getBlockListResponse {
  blocks: [
    {
      id: number;
      name: string;
      handle: string;
      picture?: string;
      createdAt: string;
      verificationInfo?: string;
    },
  ];
}

export const getBlockList = async () => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.get(API_SUFFIX.COMMUNITY.BLOCK, {
    params: { page: 0, count: 20 },
  });
  return data;
};
