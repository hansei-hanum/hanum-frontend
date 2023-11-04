import { atom } from 'recoil';

export interface authAtomProps {
  name: string;
  phone: string;
  isCurrentStudent?: boolean;
  errorMessage?: string;
}

export const authAtom = atom<authAtomProps>({
  key: 'authAtom',
  default: {
    name: '',
    phone: '',
    isCurrentStudent: false,
    errorMessage: '',
  },
});
