import { API_SUFFIX, payInstance } from './api';

export interface GetPaymentAmountResponse {
  balanceAmount: number;
}

export interface GetPaymentDetailResponse extends GetPaymentAmountResponse {
  payments: [
    {
      id: number;
      paidAmount: number | null;
      refundedAmount: number | null;
      status: 'paid' | 'refunded';
      paidTime: string;
      refundedTime: string;
      boothName: string;
    },
  ];
}

export interface PaymentValues {
  boothId: number;
  amount: number;
}

export const getPaymentDetail = async () => {
  const { data } = await payInstance.get(`${API_SUFFIX.PAYMENT_DETAIL}?page=1&limit=400`);
  return data;
};

export const payment = async ({ boothId, amount }: PaymentValues) => {
  const { data } = await payInstance.post(API_SUFFIX.PAYMENT, {
    boothId,
    amount,
  });
  return data;
};

export const getPaymentAmount = async () => {
  const { data } = await payInstance.get(API_SUFFIX.PAYMENT_AMOUNT);
  return data;
};
