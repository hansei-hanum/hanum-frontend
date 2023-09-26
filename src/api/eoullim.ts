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
  fields: [{ id: number; value: string }];
  myVote?: { id: number; fieldId: number };
  total: number;
}

export const eoullimLuckyDraw = async ({ token }: EoullimLuckyDrawValue) => {
  const { data } = await festivalInstance.post(API_SUFFIX.EOULLIM_LUCKYDRAW, {
    token: token,
  });
  return data;
};

export const eoullimGetLuckyDraw = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM_GET_LUCKYDRAW);
  return data;
};

export const eoullimVote = async ({ fieldId, id }: EoullimVoteValue) => {
  console.log(fieldId, id);
  const { data } = await festivalInstance.post(`${API_SUFFIX.EOULLIM_VOTE}${id}`, {
    fieldId,
  });
  console.log(data, 'data');
  return data;
};

export const eoullimGetVote = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM_GET_VOTE);
  return data;
};
