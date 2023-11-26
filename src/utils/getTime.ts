import moment from 'moment-timezone';

export const getPostTime = (date: string) => {
  const now = moment().tz('Asia/Seoul');
  const target = moment(date).tz('Asia/Seoul');
  const units = ['방금 전', '분', '시간', '일', '주', '달', '년'];
  const diffs = [
    now.diff(target, 'seconds'),
    now.diff(target, 'minutes'),
    now.diff(target, 'hours'),
    now.diff(target, 'days'),
    now.diff(target, 'weeks'),
    now.diff(target, 'months'),
    now.diff(target, 'years'),
  ];

  for (let i = 0; i < units.length; i++) {
    if (diffs[i] < 1) {
      return units[i];
    } else if (diffs[i + 1] < 60) {
      return `${diffs[i + 1]}${units[i + 1]} 전`;
    }
  }

  return `${diffs[6]}${units[6]} 전`;
};
