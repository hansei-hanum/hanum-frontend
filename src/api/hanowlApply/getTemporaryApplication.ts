import { hanowlApplyInstance } from '../api';
import { API_SUFFIX } from '../suffix';

export interface GetTemporaryApplicationDetail {
  id: string;
  user_id: number;
  department: {
    id: string;
    name: string;
  };
  introduction: string;
  motivation: string;
  aspiration: string;
  isSubmitted: boolean;
  updatedAt: string;
}

export interface GetTemporaryApplicationResponse {
  items: GetTemporaryApplicationDetail[];
  limit: number;
  total: number;
  totalPage: number;
  isSubmitted: boolean;
}

export const getTemporaryApplication = async () => {
  const { data } = await hanowlApplyInstance.get(API_SUFFIX.HANOWL_APPLY.APPLICATION);
  return data;
};
