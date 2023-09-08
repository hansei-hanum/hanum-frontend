import { atom } from 'recoil';

export interface hanumPayProps {
  status: boolean;
  money: string;
  message: string;
}

export const hanumPayState = atom<hanumPayProps>({
  key: 'HanumPayState',
  default: {
    status: false,
    money: '',
    message: '',
  },
});
