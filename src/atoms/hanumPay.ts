import { atom } from 'recoil';

export interface hanumPayAtomProps {
  status: boolean;
  money: string;
  message: string;
}

export const hanumPayAtom = atom<hanumPayAtomProps>({
  key: 'hanumPayAtom',
  default: {
    status: false,
    money: '',
    message: '',
  },
});
