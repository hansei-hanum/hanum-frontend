import { useState } from 'react';

import { useGetPaymentAmount } from './query';

export const useOnRefresh = () => {
  const payMent = useGetPaymentAmount();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    payMent.refetch();
    setRefreshing(false);
  };

  return {
    refreshing,
    onRefresh,
  };
};
