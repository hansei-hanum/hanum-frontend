import { atom } from 'recoil';

export interface authProps {
  name: string;
  phone: string;
  errorModal: {
    ratedLimit: boolean;
    externalApi: boolean;
  };
}

export const authState = atom<authProps>({
  key: 'authState',
  default: {
    name: '',
    phone: '',
    errorModal: {
      ratedLimit: false,
      externalApi: false,
    },
  },
});
