import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface BlockValue {
  targetId: string;
}

//ALREADY_BLOCKED

export const block = async ({ targetId }: BlockValue) => {
  setAccessToken('1');
  const { data } = await communityInstance.put(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
