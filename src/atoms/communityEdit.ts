import { atom } from 'recoil';

import { PhotosInterface } from 'src/components';

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
