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
  setAccessToken('1');
  const { data } = await communityInstance.get(API_SUFFIX.COMMUNITY.BLOCK, {
    params: { page: 0, count: 20 },
  });
  return data;
};
