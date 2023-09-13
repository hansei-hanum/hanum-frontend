import { atom } from 'recoil';

import { FetchUserResponse } from 'src/api';

export const userProfileState = atom<FetchUserResponse>({
  key: 'userProfileState',
  default: {
    created_at: '',
    id: 0,
    name: '',
    phone: '',
    profile: null,
    verification: null,
  },
});
