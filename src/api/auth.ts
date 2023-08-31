import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_SUFFIX, instance, setAccessToken } from './api';

export interface PhoneValue {
  phone: string;
}

export interface AuthValues {
  phone: string;
  code: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterValues extends AuthValues {
  name: string;
}

export type LoginValues = AuthValues;

export interface FetchUserResponse {
  id: string;
  name: string;
  nickname: string;
  created_at: string;
  profile: string;
  verification: {
    department: string;
    grade: number;
    classroom: number;
    number: number;
  };
}

export const phone = async ({ phone }: PhoneValue) => {
  const { data } = await instance.post(API_SUFFIX.PHONE, {
    phone,
  });
  return data;
};

export const register = async ({ phone, code, name }: RegisterValues) => {
  const { data } = await instance.post(API_SUFFIX.REGISTER, {
    phone,
    code,
    name,
  });
  return data;
};

export const login = async ({ phone, code }: LoginValues) => {
  const { data } = await instance.post(API_SUFFIX.LOGIN, {
    phone,
    code,
  });
  return data;
};

export const fetchUser = async (): Promise<FetchUserResponse | null> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;
  setAccessToken(token);
  const { data } = await instance.get(`${API_SUFFIX.USERS}@me/`);
  return data;
};
