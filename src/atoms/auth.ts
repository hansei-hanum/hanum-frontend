import { atom } from 'recoil';

export interface authProps {
  name: string;
  phone: string;
}

export const authState = atom<authProps>({
  key: 'authState',
  default: {
    name: '',
    phone: '',
  },
});
