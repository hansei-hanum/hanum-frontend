import { API_SUFFIX, infoInstance } from './api';

export interface GetScheduleResponse {
  date: string;
  data: string[];
}

export const getSchedule = async () => {
  const { data } = await infoInstance.get(API_SUFFIX.SCHEDULE);
  return data;
};
