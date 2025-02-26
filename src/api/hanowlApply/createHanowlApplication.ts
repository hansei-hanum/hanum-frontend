import { hanowlApplyInstance } from '../api';
import { API_SUFFIX } from '../suffix';

export interface CreateHanowlApplicationValues {
  departmentId: string;
  introduction: string;
  motivation: string;
  aspiration: string;
  isSubmit: boolean;
}

export const createHanowlApplication = async ({
  departmentId,
  introduction,
  motivation,
  aspiration,
  isSubmit,
}: CreateHanowlApplicationValues) => {
  const { data } = await hanowlApplyInstance.post(
    `${API_SUFFIX.HANOWL_APPLY.APPLICATION}?isSubmit=${isSubmit}`,
    {
      departmentId,
      introduction,
      motivation,
      aspiration,
    },
  );

  return data;
};
