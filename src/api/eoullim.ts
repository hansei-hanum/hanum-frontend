import { API_SUFFIX, authInstance } from './api';

export interface EoullimLuckDrawValue {
  token: string;
}

export interface EoullimLuckDrawResponse {
  token: string;
}

export interface EoullimVoteValue {
  id: number;
  fieldId: number;
}

export interface EoullimVoteResponse {
  title: string;
  startAt: string;
  endAt: string;
  fileds: [{ id: number; value: string }];
  myVotes?: [{ id: number; voteId: number }];
}

export const eoullimLuckDraw = async ({ token }: EoullimLuckDrawValue) => {
  const { data } = await authInstance.post(API_SUFFIX.EOULLIM_LUCKYDRAW, {
    token,
  });
  return data;
};

export const eoullimGetLuckDraw = async () => {
  const { data } = await authInstance.get(API_SUFFIX.EOULLIM_LUCKYDRAW);
  return data;
};

export const eoullimVote = async ({ fieldId, id }: EoullimVoteValue) => {
  const { data } = await authInstance.post(`${API_SUFFIX.EOULLIM_VOTE}${id}`, {
    fieldId,
  });
  return data;
};

export const eoullimGetVote = async () => {
  const { data } = await authInstance.get(API_SUFFIX.EOULLIM_GET_VOTE);
  return data;
};
