import { atom } from 'recoil';

import { GetHanowlTeamsDetail } from 'src/api/hanowlApply';

export type TeamType =
  | '기능부'
  | '방송부'
  | '안전부'
  | '행사 기획부'
  | '홍보부'
  | '총무부'
  | '학예 체육부'
  | '도서부';

export interface HanowlApplyAtomProps {
  id?: string;
  team: GetHanowlTeamsDetail | { id: string; name: string };
  introduce: string;
  motive: string;
  aspiration: string;
}

export const hanowlApplyAtom = atom<HanowlApplyAtomProps>({
  key: 'hanowlApplyAtom',
  default: {
    team: {
      id: '',
      name: '',
    },
    introduce: '',
    motive: '',
    aspiration: '',
  },
});
