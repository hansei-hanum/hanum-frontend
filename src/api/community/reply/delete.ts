import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface DeleteReplyValues {
  articleId: number;
  commentId: number;
  replyId: number;
}

export const deleteReply = async ({ articleId, commentId, replyId }: DeleteReplyValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.delete(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies/${replyId}`,
  );
  return data;
};
