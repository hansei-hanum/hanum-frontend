import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface BlockValue {
  targetId: number;
}

export const block = async ({ targetId }: BlockValue) => {
  console.log('block', targetId);
  setAccessToken('1');
  const { data } = await communityInstance.put(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
