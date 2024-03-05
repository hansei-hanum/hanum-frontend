import { communityInstance, setAccessToken, API_SUFFIX } from 'src/api';
import { PhotosInterface } from 'src/components';

export interface CreateCommentValues {
  articleId: number;
  isAnonymous: boolean;
  content: string;
  attachments?: PhotosInterface | null;
}

export const createComment = async ({
  articleId,
  isAnonymous,
  content,
  attachments,
}: CreateCommentValues) => {
  setAccessToken('9');
  const formData = new FormData();

  formData.append('isAnonymous', String(isAnonymous));
  formData.append('content', content);

  if (attachments) {
    const fileData = {
      uri: attachments.uri,
      name: attachments.name,
      type: attachments.type,
    };
    formData.append(`attachments`, fileData);
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
