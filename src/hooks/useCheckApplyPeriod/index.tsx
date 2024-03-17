import { useEffect, useState } from 'react';

import { HANOWL_APPLY } from 'src/constants';

export const useCheckApplyPeriod = () => {
  const [isApplyPeriod, setIsApplyPeriod] = useState(false);
  const [time, setTime] = useState<string>('0일 0시간 0분 0초');

  const checkApplyPeriod = () => {
    const now = new Date();
    const start = new Date(HANOWL_APPLY.START_DATE);

    let diff = Math.floor((start.getTime() - now.getTime()) / 1000);
    setIsApplyPeriod(diff < 0);

    let timeLeft = '';
    const days = Math.floor(diff / 86400);

    diff %= 86400;

    const hours = Math.floor(diff / 3600);
    diff %= 3600;

    const minutes = Math.floor(diff / 60);
    diff %= 60;

    const seconds = diff;

    if (days > 0) {
      timeLeft = `${days}일 `;
    } else {
      timeLeft = `${hours}시간 ${minutes}분 ${seconds}초`;
    }

    setTime(timeLeft);
  };

  useEffect(() => {
    setInterval(() => {
      checkApplyPeriod();
    }, 1000);
  }, []);

  return { isApplyPeriod, time };
};
