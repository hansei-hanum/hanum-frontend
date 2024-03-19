import { TeamType } from 'src/atoms';

import { hanowlApplyInstance } from '../api';
import { API_SUFFIX } from '../suffix';

export interface GetHanowlTeamsDetail {
  id: string;
  name: TeamType;
}

export interface GetHanowlTeamsResponse {
  items: GetHanowlTeamsDetail[];
}

export const getHanowlTeams = async () => {
  const { data } = await hanowlApplyInstance.get(API_SUFFIX.HANOWL_APPLY.GET_TEAMS);
  return data;
};
