import axios, { AxiosInstance } from 'axios';

export const API_BASEURLS = {
  PAY: 'https://pay.hanum.us',
  AUTH: 'https://account.hanum.us',
  INFO: 'https://info.hanum.us',
};

export const API_SUFFIX = {
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  PHONE: '/auth/phone/',
  USERS: '/users/',
  KEYS: '/keys/',
  STUDENT_VERIFY: '/users/@me/verifications',
  PAYMENT_DETAIL: '/eoullim/balance/detail',
  PAYMENT: '/eoullim/balance/payment',
  PAYMENT_AMOUNT: '/eoullim/balance/amount',
  NOTIFICATION: '/users/@me/tokens/fcm/',
  SCHEDULE: '/schedule/',
  TIMETABLE: '/timetable/',
};

const baseConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    ...baseConfig,
  });

  return instance;
};

export const authInstance = createAxiosInstance(API_BASEURLS.AUTH);
export const payInstance = createAxiosInstance(API_BASEURLS.PAY);
export const infoInstance = createAxiosInstance(API_BASEURLS.INFO);

export interface APIResponse<T = unknown> {
  message: string;
  data: T;
}

export interface APIErrorResponse {
  message: string;
  data?: null;
}

export const setAccessToken = (token: string | null) => {
  const instances = [authInstance, payInstance, infoInstance];

  instances.forEach((instance) => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
  });
};
