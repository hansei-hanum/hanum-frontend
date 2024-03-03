import { communityInstance, API_SUFFIX } from 'src/api';

export interface deletePostValues {
  id: number;
}

export const deletePost = async ({ id }: deletePostValues) => {
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.DELETE}/${id}`);
  return data;
};
