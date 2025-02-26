import { atom } from 'recoil';

export const themeAtom = atom<string | null>({
  key: 'theme',
  default: 'light',
});
