import { atom } from 'recoil';

export const disableAtom = atom<boolean>({
  key: 'disableAtom',
  default: true,
});
