import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_SUFFIX, payInstance, setAccessToken } from './api';

export interface GetPayDetailResponse {
  balanceAmount: number;
  payments: [
    {
      id: number;
      paidAmount: number | null;
      refundedAmount: number | null;
      status: string;
      paidTime: string | null;
      refundedTime: string | null;
      boothName: string;
    },
  ];
}

export interface PayMentValues {
  boothId: number;
  amount: number;
}

export const getPayDetail = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('token', token);
  if (!token) return null;
  setAccessToken(token);
  const { data } = await payInstance.get(API_SUFFIX.GET_PAY_DETAIL);
  return data;
};

export const payment = async ({ boothId, amount }: PayMentValues) => {
  const { data } = await payInstance.post(API_SUFFIX.PAYMENT, {
    boothId,
    amount,
  });
  return data;
};
