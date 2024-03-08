import { atom } from 'recoil';

export const articleIdAtom = atom<number | null>({
  key: 'articleIdAtom',
  default: null,
});
