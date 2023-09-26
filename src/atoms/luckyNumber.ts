import { atom } from 'recoil';

export interface luckyNumberProps {
  number: number | null;
  errorMessage: string | null;
}

export const luckyNumberState = atom<luckyNumberProps>({
  key: 'luckyNumberState',
  default: {
    number: null,
    errorMessage: null,
  },
});
