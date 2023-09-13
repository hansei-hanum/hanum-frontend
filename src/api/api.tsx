import axios from 'axios';

export const API_SUFFIX = {
  HANUM_PAY_BASEURL: 'https://pay.hanum.us',
  AUTH_BASEURL: 'https://account.hanum.us',
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  PHONE: '/auth/phone/',
  USERS: '/users/',
  KEYS: '/keys/',
  STUDENT_VERIFY: '/users/@me/verifications',
  GET_PAY_DETAIL: '/eoullim/balance/detail',
  PAYMENT: '/eoullim/balance/payment',
};

export const authInstance = axios.create({
  baseURL: API_SUFFIX.AUTH_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const payInstance = axios.create({
  baseURL: API_SUFFIX.HANUM_PAY_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface APIResponse<T = unknown> {
  message: string;
  data: T;
}

export interface APIErrorResponse {
  message: string;
  data?: null;
}

export const setAccessToken = (token: string | null) => {
  if (token) {
    authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    payInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authInstance.defaults.headers.common.Authorization;
    delete payInstance.defaults.headers.common.Authorization;
  }
};
