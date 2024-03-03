import { communityInstance, API_SUFFIX, setAccessToken } from 'src/api';

export interface DeletePostValues {
  id: number;
}

export const deletePost = async ({ id }: DeletePostValues) => {
  setAccessToken('2');
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BASE_URL}/${id}`);
  return data;
};
