import { communityInstance, API_SUFFIX } from 'src/api';

export interface getBlockResponse {
  blocks: [{ id: number; name: string; handle: string; picture?: string; createdAt: string }];
}

export const getBlock = async () => {
  const { data } = await communityInstance.get(API_SUFFIX.COMMUNITY.BLOCK, {
    params: { page: 0, count: 20 },
  });
  return data;
};
