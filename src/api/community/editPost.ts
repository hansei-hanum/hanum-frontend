import { PhotosInterface } from 'src/components';

import { COMMUNITY_API_SUFFIX, communityInstance, setAccessToken } from '../api';

export interface editPostValues {
  id: number;
  content: string;
  keepAttachments?: number[];
  attachments?: PhotosInterface[];
}

export const editPost = async ({ id, content, keepAttachments, attachments }: editPostValues) => {
  setAccessToken('2');
  const formData = new FormData();

  formData.append('content', content);

  if (keepAttachments) {
    keepAttachments.forEach((attachment) => {
      formData.append('keepAttachments', String(attachment));
    });
  }

  if (attachments && typeof attachments !== 'string') {
    attachments.forEach((attachment) => {
      const fileData = {
        uri: attachment.uri,
        name: attachment.name,
        type: attachment.type,
      };
      formData.append(`attachments`, fileData);
    });
  }

  const data = await communityInstance.post(`${COMMUNITY_API_SUFFIX.EDIT}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};
