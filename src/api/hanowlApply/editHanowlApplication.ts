import { hanowlApplyInstance } from '../api';
import { API_SUFFIX } from '../suffix';

import { CreateHanowlApplicationValues } from './createHanowlApplication';

export interface EditHanowlApplicationValues
  extends Omit<CreateHanowlApplicationValues, 'isSubmit'> {
  applicationId: string;
}

export const editHanowlApplication = async ({
  departmentId,
  introduction,
  motivation,
  aspiration,
  applicationId,
}: EditHanowlApplicationValues) => {
  const { data } = await hanowlApplyInstance.patch(
    `${API_SUFFIX.HANOWL_APPLY.APPLICATION}/${applicationId}`,
    {
      departmentId,
      introduction,
      motivation,
      aspiration,
    },
  );

  return data;
};
