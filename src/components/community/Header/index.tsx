import React from 'react';
import { View } from 'react-native';

import { GoBackIcon, Text } from 'src/components';

import * as S from './styled';

export interface CommunityHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title, rightContent }) => {
  return (
    <S.CommunityHeaderContainer>
      <GoBackIcon />
      <Text size={16}>{title}</Text>
      {!rightContent ? <View style={{ flexGrow: 0.1 }} /> : <>{rightContent}</>}
    </S.CommunityHeaderContainer>
  );
};
