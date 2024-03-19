import axios, { AxiosInstance } from 'axios';

export const API_BASEURLS = {
  PAY: 'https://pay.hanum.us',
  AUTH: 'https://account.hanum.us',
  INFO: 'https://info.hanum.us',
  FESTIVAL: 'https://festival.hanum.us',
  COMMUNITY: 'https://community.hanum.us/',
  HANOWL_APPLY: 'https://noti-recruit.hanum.us/',
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
export const festivalInstance = createAxiosInstance(API_BASEURLS.FESTIVAL);
export const communityInstance = createAxiosInstance(API_BASEURLS.COMMUNITY);
export const hanowlApplyInstance = createAxiosInstance(API_BASEURLS.HANOWL_APPLY);

export interface APIResponse<T = unknown> {
  message: string;
  data: T;
}

export interface APIErrorResponse {
  message: string;
  data?: null;
}

export const setAccessToken = (token: string | null) => {
  const instances = [
    authInstance,
    payInstance,
    infoInstance,
    festivalInstance,
    communityInstance,
    hanowlApplyInstance,
  ];

  instances.forEach((instance) => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
  });
};
