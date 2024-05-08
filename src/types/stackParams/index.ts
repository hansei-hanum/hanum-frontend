import { AuthStackParamList } from './auth';
import { CommunityStackParamList } from './community';
import { EoullimStackParamList } from './eoullim';
import { HanowlStackParamList } from './hanowl';
import { HanumPayStackParamList } from './hanumPay';
import { MainStackParamList } from './main';
import { UserStackParamList } from './user';
import { SportsTotoParamList } from './sportsToto';

export type RootStackParamList = AuthStackParamList &
  MainStackParamList &
  HanumPayStackParamList &
  EoullimStackParamList &
  CommunityStackParamList &
  UserStackParamList &
  SportsTotoParamList &
  HanowlStackParamList & {
    NoInternet: undefined;
  };
