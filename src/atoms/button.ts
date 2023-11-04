import { atom } from 'recoil';

export interface buttonAtomProps {
  loading: boolean;
  disabled: boolean;
}

export const buttonAtom = atom<buttonAtomProps>({
  key: 'buttonAtom',
  default: {
    loading: false,
    disabled: false,
  },
});
