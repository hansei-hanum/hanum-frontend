import { atom } from 'recoil';

export const boothState = atom({
  key: 'boothState',
  default: {
    id: 0,
    name: '',
  },
});
