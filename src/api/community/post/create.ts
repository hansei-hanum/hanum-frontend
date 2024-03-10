import { PhotosInterface } from 'src/components';
import { API_SUFFIX, communityInstance, setAccessToken } from 'src/api';

export enum LimitedArticleScopeOfDisclosure {
  /**
   * 전체 공개
   */
  Public = 'public',
  /**
   * 교직원 공개
   */
  Faculty = 'faculty',
  /**
   * 졸업생 공개
   */
  Alumni = 'alumni',
  /**
   * 학생 공개
   */
  Student = 'student',
  /**
   * 동급생 공개
   */
  Peer = 'peer',
}

export interface CreatePostValues {
  isAnonymous: boolean;
  author?: string;
  content: string;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments?: PhotosInterface[];
}

export const createPost = async ({
  isAnonymous,
  author,
  content,
  scopeOfDisclosure,
  attachments,
}: CreatePostValues) => {
  setAccessToken('11');
  const formData = new FormData();

  formData.append('isAnonymous', String(isAnonymous));
  formData.append('author', author || '');
  formData.append('content', content);
  formData.append('scopeOfDisclosure', String(scopeOfDisclosure));

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

  const { data } = await communityInstance.post(API_SUFFIX.COMMUNITY.BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
