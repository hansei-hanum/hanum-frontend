import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, payment, PaymentValues } from 'src/api';
import { hanumPayState } from 'src/atoms';
import { useGetPaymentDetail, useNavigate } from 'src/hooks';
import { formattedMoney } from 'src/utils';

export const usePayment = (): UseMutationResult<
  APIResponse<{ balanceAmount: number }>,
  AxiosError<APIErrorResponse>,
  PaymentValues
> => {
  const [hanumPay, setHanumPay] = useRecoilState(hanumPayState);
  const navigate = useNavigate();
  const getPaymentDetail = useGetPaymentDetail();

  return useMutation('usePayment', payment, {
    onSuccess: ({ balanceAmount }) => {
      const checkAmount = balanceAmount > 999 ? formattedMoney(balanceAmount) : balanceAmount;
      getPaymentDetail.refetch();
      navigate('HanumPayStatus');
      setHanumPay({
        money: checkAmount,
        status: true,
        message: `남은 한움페이 잔액은 ${checkAmount}원이에요.`,
      });
    },
    onError: (error) => {
      console.log(error.response, 'error');
      const message = error.response?.data.message;
      switch (message) {
        case 'NOT_ALLOWED':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '허용되지 않은 사용자가 환전을 시도했어요',
          });
          break;
        case 'BOOTH_NOT_FOUND':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '부스를 찾을 수 없어요',
          });
          break;
        case 'PAYMENT_NOT_FOUND':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '결제 정보를 찾을 수 없어요',
          });
          break;
        case 'BOOTH_BALANCE_NOT_FOUND':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '부스 잔액을 찾을 수 없어요',
          });
          break;
        case 'INSUFFICIENT_SENDER_BALANCE':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '잔액이 부족해요',
          });
          break;
        case 'USER_NOT_FOUND':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '사용자를 찾을 수 없어요',
          });
          break;
        case 'NOT_A_PERSONAL_BALANCE':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '개인 잔액이 아니에요',
          });
          break;
        case 'PAYMENT_ALREADY_CANCELLED':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '이미 취소된 결제에요',
          });
          break;
        case 'PAYMENT_CANCELLATION_STATUS_NOT_UPDATED':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '결제 취소 상태가 업데이트 되지 않았어요',
          });
          break;
        case 'SENDER_ID_EQUALS_RECEIVER_ID':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '본인에게는 환전할 수 없어요',
          });
          break;
        case 'INVALID_TRANSFER_AMOUNT':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '환전할 수 없는 금액이에요',
          });
          break;
        case 'INVALID_SENDER_ID':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '잘못된 보내는 사람 ID에요',
          });
          break;
        case 'INVALID_RECEIVER_ID':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '잘못된 받는 사람 ID에요',
          });
          break;
        case 'SENDER_BALANCE_NOT_UPDATED':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '보내는 사람 잔액이 업데이트 되지 않았어요',
          });
          break;
        case 'RECEIVER_BALANCE_NOT_UPDATED':
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '받는 사람 잔액이 업데이트 되지 않았어요',
          });
          break;
        default:
          console.log(error, 'error');
          setHanumPay({
            ...hanumPay,
            status: false,
            message: '알 수 없는 오류가 발생했어요',
          });
          break;
      }
    },
    retry: 0,
  });
};
