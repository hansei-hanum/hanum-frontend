import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PhotosInterface } from 'src/components';

export interface CreateReplyValues {
  articleId: number;
  commentId: number;
  isAnonymous: boolean;
  content: string;
  attachment?: PhotosInterface | null;
}

export const createReply = async ({
  articleId,
  commentId,
  isAnonymous,
  content,
  attachment,
}: CreateReplyValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const formData = new FormData();

  formData.append('isAnonymous', String(isAnonymous));
  formData.append('content', content);

  if (attachment) {
    const fileData = {
      uri: attachment.uri,
      name: attachment.name,
      type: attachment.type,
    };
    formData.append(`attachment`, fileData);
  }

  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments/${commentId}/replies`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
