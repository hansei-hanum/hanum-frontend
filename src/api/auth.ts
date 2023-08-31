import { API_SUFFIX, instance } from './api';

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
