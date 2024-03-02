import { atom } from 'recoil';

export interface communityEditAtomProps {
  text: string;
  image?: string[];
}

export const communityEditAtom = atom<communityEditAtomProps>({
  key: 'communityEditAtom',
  default: {
    text: '',
    image: [],
  },
});
