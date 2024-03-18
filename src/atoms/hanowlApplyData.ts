import { atom } from 'recoil';

import { GetTemporaryApplicationResponse } from 'src/api/hanowlApply';

export const hanowlApplyDataAtom = atom<GetTemporaryApplicationResponse[]>({
  key: 'hanowlApplyDataAtom',
  default: [],
});
