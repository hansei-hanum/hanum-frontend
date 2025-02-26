import { atom } from 'recoil';

export interface boothAtomProps {
  id: number;
  name: string;
}

export const boothAtom = atom<boothAtomProps>({
  key: 'boothAtom',
  default: {
    id: 0,
    name: '',
  },
});
