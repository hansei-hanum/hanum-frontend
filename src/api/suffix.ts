export const AUTH = {
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  PHONE: '/auth/phone/',
  USERS: '/users/',
  KEYS: '/keys/',
  STUDENT_VERIFY: '/users/@me/verifications',
};

export const INFO = {
  NOTIFICATION: '/users/@me/tokens/fcm/',
  SCHEDULE: '/schedule/',
  TIMETABLE: '/timetable/',
  MEAL: '/meal/',
};

export const PAY = {
  PAYMENT_DETAIL: '/eoullim/balance/detail',
  PAYMENT: '/eoullim/balance/payment',
  PAYMENT_AMOUNT: '/eoullim/balance/amount',
};

export const EOULLIM = {
  EOULLIM_GET_VOTE: '/vote/primary',
  EOULLIM_VOTE: '/vote/',
  EOULLIM_LUCKYDRAW: '/luckydraw/lucky_numbers',
  EOULLIM_GET_LUCKYDRAW: '/luckydraw/lucky_number',
};

export const COMMUNITY = {
  BASE_URL: '/articles',
  BLOCK: '/blocks',
  MY_ARTICLES: '/users/@me/articles',
  USER_MENTION: '/users/mentions/search',
};

export const HANOWL_APPLY = {
  TEMPORARY_APPLICATION: '/user/@me/applications',
  GET_TEAMS: '/departments',
};

export interface ApiSuffixProps {
  AUTH: typeof AUTH;
  INFO: typeof INFO;
  PAY: typeof PAY;
  EOULLIM: typeof EOULLIM;
  COMMUNITY: typeof COMMUNITY;
  HANOWL_APPLY: typeof HANOWL_APPLY;
}

export const API_SUFFIX: ApiSuffixProps = {
  AUTH,
  INFO,
  PAY,
  EOULLIM,
  COMMUNITY,
  HANOWL_APPLY,
};
