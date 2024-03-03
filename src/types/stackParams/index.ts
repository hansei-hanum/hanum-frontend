import { AuthStackParamList } from './auth';
import { CommunityStackParamList } from './community';
import { EoullimStackParamList } from './eoullim';
import { HanowlStackParamList } from './hanowl';
import { HanumPayStackParamList } from './hanumPay';
import { MainStackParamList } from './main';
import { UserStackParamList } from './user';

export type RootStackParamList = AuthStackParamList &
  MainStackParamList &
  HanumPayStackParamList &
  EoullimStackParamList &
  CommunityStackParamList &
  UserStackParamList &
  HanowlStackParamList & {
    NoInternet: undefined;
  };
