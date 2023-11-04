import { atom } from 'recoil';

export interface luckyNumberAtomProps {
  number: number;
  errorMessage: string;
}

export const luckyNumberAtom = atom<luckyNumberAtomProps>({
  key: 'luckyNumberAtom',
  default: {
    number: 0,
    errorMessage: '',
  },
});
