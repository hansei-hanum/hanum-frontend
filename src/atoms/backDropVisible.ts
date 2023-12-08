import { atom } from 'recoil';

export const backDropVisibleAtom = atom<boolean>({
  key: 'backDropVisibleAtom',
  default: false,
});
