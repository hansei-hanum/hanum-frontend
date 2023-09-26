import { atom } from 'recoil';

export interface luckyNumberProps {
  number: number;
  errorMessage: string;
}

export const luckyNumberState = atom<luckyNumberProps>({
  key: 'luckyNumberState',
  default: {
    number: 0,
    errorMessage: '',
  },
});
