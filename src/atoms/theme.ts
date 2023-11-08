import { atom } from 'recoil';

export const themeAtom = atom<'light' | 'dark'>({
  key: 'theme',
  default: 'light',
});
