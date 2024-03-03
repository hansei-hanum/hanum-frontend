import React from 'react';
import { View } from 'react-native';

import { GoBackIcon, Text } from 'src/components';

import * as S from './styled';

export interface CommunityHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  isLoading?: boolean;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  title,
  rightContent,
  isLoading,
}) => {
  return (
    <S.CommunityHeaderContainer>
      <GoBackIcon isLoading={isLoading} />
      <Text size={16}>{title}</Text>
      {!rightContent ? <View style={{ flexGrow: 0.1 }} /> : rightContent}
    </S.CommunityHeaderContainer>
  );
};
