import { API_SUFFIX, instance } from './api';

export interface PhoneValue {
  phone: string;
}

export const phone = async ({ phone }: PhoneValue) => {
  const { data } = await instance.post(API_SUFFIX.PHONE, {
    phone,
  });
  return data;
};
