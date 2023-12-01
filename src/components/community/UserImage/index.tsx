import React from 'react';

import { UserLogo } from 'src/assets';

import * as S from './styled';

export interface CommunityUserImageProps {
  userProfile?: string | null;
}

export const CommunityUserImage: React.FC<CommunityUserImageProps> = ({ userProfile }) => {
  return <S.CommunityChatImage source={userProfile ? { uri: userProfile } : UserLogo} />;
};
