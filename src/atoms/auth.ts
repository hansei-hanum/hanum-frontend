import { atom } from 'recoil';

export interface authProps {
  name: string;
  phone: string;
  errorMessage?: string;
}

export const authState = atom<authProps>({
  key: 'authState',
  default: {
    name: '',
    phone: '',
    errorMessage: '',
  },
});
