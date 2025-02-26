import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, API_SUFFIX, setAccessToken } from 'src/api';

export interface getBlockListResponse {
  items: [
    {
      id: number;
      name: string;
      picture?: string;
      createdAt: string;
      verificationInfo?: string;
    },
  ];
}

export interface GetBlockListValue {
  cursor?: number;
}

export const getBlockList = async ({ cursor }: GetBlockListValue) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.get(API_SUFFIX.COMMUNITY.BLOCK, {
    params: cursor,
  });

  const nextPage = data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
