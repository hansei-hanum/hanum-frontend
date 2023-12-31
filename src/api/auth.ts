import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_SUFFIX, authInstance, setAccessToken } from './api';

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

export interface VerificationUser {
  type: 'GRADUATED' | 'STUDENT' | 'TEACHER' | null;
  department: null | string;
  grade: null | number;
  classroom: null | number;
  number: null | number;
  valid_until: null | string;
  graduated_at: null | string;
  isUsed?: boolean;
}

export interface FetchUserResponse {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  profile: string | null;
  verification: VerificationUser | null;
}

export interface UserVerifyValue {
  code: string;
  isCheck: boolean;
}

export type UserVerifyResponse = Omit<VerificationUser, 'graduated_at' | 'valid_until'>;

export const phone = async ({ phone }: PhoneValue) => {
  const { data } = await authInstance.post(API_SUFFIX.PHONE, {
    phone,
  });
  return data;
};

export const register = async ({ phone, code, name }: RegisterValues) => {
  const { data } = await authInstance.post(API_SUFFIX.REGISTER, {
    phone,
    code,
    name,
  });
  return data;
};

export const login = async ({ phone, code }: LoginValues) => {
  const { data } = await authInstance.post(API_SUFFIX.LOGIN, {
    phone,
    code,
  });
  return data;
};

export const fetchUser = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;
  setAccessToken(token);
  const { data } = await authInstance.get(`${API_SUFFIX.USERS}@me/`);
  return data;
};

export const userVerify = async ({ code, isCheck }: UserVerifyValue) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;
  setAccessToken(token);
  if (isCheck) {
    const { data } = await authInstance.get(`${API_SUFFIX.KEYS}${code}/`);
    return data;
  } else {
    const { data } = await authInstance.post(API_SUFFIX.STUDENT_VERIFY, {
      code,
    });
    return data;
  }
};

export const deleteUser = async () => {
  await authInstance.delete(`${API_SUFFIX.USERS}@me/`);
  await AsyncStorage.removeItem('token');
};
