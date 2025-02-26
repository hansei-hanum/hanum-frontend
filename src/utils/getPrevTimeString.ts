import moment from 'moment-timezone';

export const getPrevTimeString = (date: string) => {
  const now = moment.duration(moment().tz('Asia/Seoul').diff(moment(date)));
  const [years, months, weeks, days, hours, minutes, seconds] = [
    now.years(),
    now.months(),
    now.weeks(),
    now.days(),
    now.hours(),
    now.minutes(),
    now.seconds(),
  ];

  switch (true) {
    case years > 0:
      return `${years}년 전`;
    case months > 0:
      return `${months}달 전`;
    case weeks > 0:
      return `${weeks}주 전`;
    case days > 0:
      return `${days}일 전`;
    case hours > 0:
      return `${hours}시간 전`;
    case minutes > 0:
      return `${minutes}분 전`;
    case seconds > 0:
      return `${seconds}초 전`;
    default:
      return '방금 전';
  }
};
