import { atom } from 'recoil';

export interface buttonAtomProps {
  loading: boolean;
  disabled: boolean;
}

export const loadingAtom = atom({
  key: 'loadingAtom',
  default: false,
});
