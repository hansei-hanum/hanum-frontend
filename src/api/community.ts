import RNFS from 'react-native-fs';

import { isIos } from 'src/utils';

import { COMMUNITY_API_SUFFIX, communityInstance } from './api';

/// </summary>
export enum LimitedArticleScopeOfDisclosure {
  /**
   * 전체 공개
   */
  Public = 5,
  /**
   * 교직원 공개
   */
  Faculty = 4,
  /**
   * 졸업생 공개
   */
  Alumni = 3,
  /**
   * 학생 공개
   */
  Student = 2,
  /**
   * 동급생 공개
   */
  Peer = 1,
}

export interface createPostValues {
  isAnonymous: boolean;
  author: string | null;
  content: string;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
  attachments?: string[];
}

export const createPost = async ({
  isAnonymous,
  author,
  content,
  scopeOfDisclosure,
  attachments,
}: createPostValues) => {
  communityInstance.defaults.headers.common.Authorization = `Bearer 1`;
  const formData = new FormData();

  formData.append('isAnonymous', String(isAnonymous));
  formData.append('author', author || '');
  formData.append('content', content);
  formData.append('scopeOfDisclosure', String(scopeOfDisclosure));

  if (attachments && attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      const filePath = attachments[i];
      const fileName = isIos ? filePath.replace('file://', '') : filePath.split('/').pop();
      console.log('fileName', fileName);
      const fileData = await RNFS.readFile(filePath, 'base64');
      console.log('fileData', fileData);
      formData.append(`attachments[${i}]`, {
        name: fileName,
        data: fileData,
        type: 'image/*',
      });
    }
  }

  //   console.log('formData', formData, isAnonymous, author, content, scopeOfDisclosure);

  const data = await communityInstance.post(COMMUNITY_API_SUFFIX.CREATE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};
