import { communityInstance, API_SUFFIX } from 'src/api';

export interface DeletePostValues {
  id: number;
}

export const deletePost = async ({ id }: DeletePostValues) => {
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BASE_URL}/${id}`);
  return data;
};
