import { API_SUFFIX, infoInstance } from './api';

export interface GetInfoResponse {
  date: string;
  data: string[];
}

export interface GetMonthScheduleValue {
  month: string;
}

export interface GetMealValue extends GetMonthScheduleValue {}

export interface GetMealResponse {
  date: string;
  kcal: number;
  menus: string[];
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

export const getMeal = async ({ month }: GetMealValue) => {
  const { data } = await infoInstance.get(`${API_SUFFIX.MEAL}${month}`);
  return data;
};
