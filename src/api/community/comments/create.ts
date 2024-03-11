import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken, API_SUFFIX } from 'src/api';
import { PhotosInterface } from 'src/components';

export interface CreateCommentValues {
  articleId: number;
  isAnonymous: boolean;
  content: string;
  attachment?: PhotosInterface | null;
}

export const createComment = async ({
  articleId,
  isAnonymous,
  content,
  attachment,
}: CreateCommentValues) => {
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
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};
