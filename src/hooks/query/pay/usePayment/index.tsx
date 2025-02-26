import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, payment, PaymentValues } from 'src/api';
import { hanumPayAtom } from 'src/atoms';
import { useGetPaymentAmount, useGetPaymentDetail, useNavigate } from 'src/hooks';
import { formattedMoney } from 'src/utils';
import { PAY_FAILED, payMentErrorMessage } from 'src/constants';

export const usePayment = (): UseMutationResult<
  APIResponse<{ balanceAmount: number; transaction: { transferAmount: number } }>,
  AxiosError<APIErrorResponse>,
  PaymentValues
> => {
  const [hanumPay, setHanumPay] = useRecoilState(hanumPayAtom);
  const navigate = useNavigate();
  const getPaymentDetail = useGetPaymentDetail();
  const getPayment = useGetPaymentAmount();

  return useMutation('usePayment', payment, {
    onSuccess: ({ data }) => {
      const transFerAmount = data.transaction.transferAmount;
      const balanceAmount = data.balanceAmount;
      getPaymentDetail.refetch();
      getPayment.refetch();
      navigate('HanumPayStatus');
      setHanumPay({
        money: transFerAmount > 999 ? formattedMoney(`${transFerAmount}`) : transFerAmount,
        status: true,
        message: `남은 한움페이 잔액은 ${
          balanceAmount > 999 ? formattedMoney(`${balanceAmount}`) : balanceAmount
        }원이에요.`,
      });
    },
    onError: (error) => {
      navigate('HanumPayStatus');
      const message = error.response?.data.message;
      console.log(error, 'error', error.response?.data.message);

      setHanumPay({
        ...hanumPay,
        status: false,
        message: payMentErrorMessage[message ?? ''] || PAY_FAILED,
      });
    },
    retry: 0,
  });
};
