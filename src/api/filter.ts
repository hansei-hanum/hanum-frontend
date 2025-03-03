import { communityFilterInstance } from './api';
import { API_SUFFIX } from './suffix';

export interface ValidateMessageRequest {
  contentName: string;
  author: string;
  content: string;
}

export const communityFilter = async ({ contentName, author, content }: ValidateMessageRequest) => {
  const { data } = await communityFilterInstance.post(API_SUFFIX.COMMUNITYFILTER.FILTER, {
    contentName,
    author,
    content,
  });
  return data;
};
