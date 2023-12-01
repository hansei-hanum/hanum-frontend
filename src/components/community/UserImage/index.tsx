import React from 'react';

import { UserLogo } from 'src/assets';

import * as S from './styled';

export interface CommunityUserImageProps {
  userImage?: string | null;
}

export const CommunityUserImage: React.FC<CommunityUserImageProps> = ({ userImage }) => {
  return (
    <S.CommunityUserImage resizeMode="contain" source={userImage ? { uri: userImage } : UserLogo} />
  );
};
