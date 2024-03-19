import { atom } from 'recoil';

import { GetTemporaryApplicationDetail } from 'src/api/hanowlApply';

export const hanowlApplyDataAtom = atom<GetTemporaryApplicationDetail[]>({
  key: 'hanowlApplyDataAtom',
  default: [],
});
