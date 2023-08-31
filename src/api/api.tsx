import axios from 'axios';

export const API_SUFFIX = {
  BASEURL: process.env.EXPO_PUBLIC_BASE_URL,
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  PHONE: '/auth/phone/',
  USERS: '/users/',
};

export const instance = axios.create({
  baseURL: API_SUFFIX.BASEURL,
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
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};
