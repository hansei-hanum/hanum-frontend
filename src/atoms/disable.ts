import { atom } from 'recoil';

export const isDisableAtom = atom<boolean>({
  key: 'isDisableAtom',
  default: true,
});
