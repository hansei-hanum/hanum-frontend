import React from 'react';
import { View, ViewProps } from 'react-native';

import { GoBackIcon, Text } from 'src/components';

import * as S from './styled';

export interface ScreenHeaderCustomProps {
  title: string;
  rightContent?: React.ReactNode;
  isLoading?: boolean;
}

export type ScreenHeaderProps = ScreenHeaderCustomProps & ViewProps;

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightContent,
  isLoading,
  ...props
}) => {
  return (
    <S.ScreenHeaderContainer {...props}>
      <GoBackIcon isLoading={isLoading} />
      <Text size={16}>{title}</Text>
      {!rightContent ? <View style={{ flexGrow: 0.1 }} /> : rightContent}
    </S.ScreenHeaderContainer>
  );
};
