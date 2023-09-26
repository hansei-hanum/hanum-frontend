import { atom } from 'recoil';

export const luckyNumberState = atom<null | number>({
  key: 'luckyNumberState',
  default: null,
});
