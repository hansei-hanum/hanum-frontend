import React from 'react';
import { View } from 'react-native';

import { GoBackIcon, Text } from 'src/components';

import * as S from './styled';

export interface CommunityHeaderProps {
  title: string;
  leftContent?: React.ReactNode;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title, leftContent }) => {
  return (
    <S.CommunityHeaderContainer>
      <GoBackIcon />
      <Text size={16}>{title}</Text>
      {!leftContent ? <View style={{ flexGrow: 0.1 }} /> : <>{leftContent}</>}
    </S.CommunityHeaderContainer>
  );
};
