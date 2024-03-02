import { atom } from 'recoil';

export interface communityEditAtomProps {
  text: string;
  image?: string[];
  isEdit?: boolean;
}

export const communityEditAtom = atom<communityEditAtomProps>({
  key: 'communityEditAtom',
  default: {
    text: '',
    image: [],
    isEdit: false,
  },
});
