import { atom } from 'recoil';

export const editHanowlApplicationAtom = atom<string | null>({
  key: 'editHanowlApplicationAtom',
  default: null,
});
