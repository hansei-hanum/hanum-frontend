import { atom } from 'recoil';

export interface CommunityEditAtomProps {
  text: string;
  images?: { uri: string; id: number }[];
  isEdit?: boolean;
  id: number | null;
}

export const communityEditAtom = atom<CommunityEditAtomProps>({
  key: 'communityEditAtom',
  default: {
    text: '',
    images: [],
    id: null,
  },
});
