import { atom } from 'recoil';

export interface authProps {
  name: string;
  phone: string;
  isCurrentStudent?: boolean;
  errorMessage?: string;
}

export const authState = atom<authProps>({
  key: 'authState',
  default: {
    name: '',
    phone: '',
    isCurrentStudent: false,
    errorMessage: '',
  },
});
