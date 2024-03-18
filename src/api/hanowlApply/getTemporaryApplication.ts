import { hanowlApplyInstance } from '../api';
import { API_SUFFIX } from '../suffix';

export interface GetTemporaryApplicationResponse {
  id: string;
  user_id: number;
  department: {
    id: string;
    name: string;
  };
  introduction: string;
  motivation: string;
  aspiration: string;
  is_submitted: boolean;
  updated_at: string;
}

export const getTemporaryApplication = async () => {
  const { data } = await hanowlApplyInstance.get(API_SUFFIX.HANOWL_APPLY.TEMPORARY_APPLICATION);
  return data;
};
