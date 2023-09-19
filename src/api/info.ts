// export interface Schedule

import { API_SUFFIX, infoInstance } from './api';

export const getSchedule = async () => {
  const { data } = await infoInstance.get(API_SUFFIX.SCHEDULE);
  return data;
};
