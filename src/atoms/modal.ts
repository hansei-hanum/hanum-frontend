import { atom } from 'recoil';

export const modalAtom = atom<boolean>({
  key: 'modalAtom',
  default: false,
});
