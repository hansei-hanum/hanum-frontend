import { festivalInstance } from './api';
import { API_SUFFIX } from './suffix';

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
  const { data } = await festivalInstance.post(API_SUFFIX.EOULLIM.EOULLIM_LUCKYDRAW, {
    token: token,
  });
  return data;
};

export const eoullimGetLuckyDraw = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM.EOULLIM_GET_LUCKYDRAW);
  return data;
};

export const eoullimVote = async ({ fieldId, id }: EoullimVoteValue) => {
  const { data } = await festivalInstance.post(`${API_SUFFIX.EOULLIM.EOULLIM_VOTE}${id}`, {
    fieldId,
  });
  return data;
};

export const eoullimGetVote = async () => {
  const { data } = await festivalInstance.get(API_SUFFIX.EOULLIM.EOULLIM_GET_VOTE);
  return data;
};
