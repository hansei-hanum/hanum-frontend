import { communityInstance } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PhotosInterface } from 'src/components';

export interface createReplyValues {
  articleId: number;
  commentId: number;
  isAnonymous: boolean;
  content: string;
  attachments?: PhotosInterface;
}

export const createReply = async ({
  articleId,
  commentId,
  isAnonymous,
  content,
  attachments,
}: createReplyValues) => {
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
