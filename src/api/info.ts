import { API_SUFFIX, infoInstance } from './api';

export interface GetInfoResponse {
  date: string;
  data: string[];
}

export interface GetMonthScheduleValue {
  month: string;
}

export interface GetLunchMenusValue extends GetMonthScheduleValue {}

export interface GetLunchMenusResponse {
  date: string;
  kcal: number;
  menus: string[];
  picture?: string;
}

export const getSchedule = async () => {
  const { data } = await infoInstance.get(API_SUFFIX.SCHEDULE);
  return data;
};

export const getMonthSchedule = async ({ month }: GetMonthScheduleValue) => {
  const { data } = await infoInstance.get(`${API_SUFFIX.SCHEDULE}${month}`);
  return data;
};

export const getTimeTable = async () => {
  const { data } = await infoInstance.get(API_SUFFIX.TIMETABLE);
  return data;
};

export const getMealTable = async ({ month }: GetLunchMenusValue) => {
  const { data } = await infoInstance.get(`${API_SUFFIX.MEAL}${month}`);
  return data;
};
