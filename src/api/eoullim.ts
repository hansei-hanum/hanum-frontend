import { API_SUFFIX, festivalInstance } from './api';

export interface EoullimLuckyDrawValue {
  token: string;
}

export interface EoullimVoteValue {
  id: number;
  fieldId: number;
}

export interface EoullimVoteResponse {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  fileds: [{ id: number; value: string }];
  myVotes?: [{ id: number; voteId: number }];
  total: number;
}

export const eoullimLuckyDraw = async ({ token }: EoullimLuckyDrawValue) => {
  console.log(token);
  const { data } = await festivalInstance.post(API_SUFFIX.EOULLIM_LUCKYDRAW, {
    token,
  });
  return data;
};

export const eoullimGetLuckyDraw = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM_GET_LUCKYDRAW);
  return data;
};

export const eoullimVote = async ({ fieldId, id }: EoullimVoteValue) => {
  const { data } = await festivalInstance.post(`${API_SUFFIX.EOULLIM_VOTE}${id}`, {
    fieldId,
  });
  return data;
};

export const eoullimGetVote = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM_GET_VOTE);
  return data;
};
