import React from 'react';
import { View, ViewProps } from 'react-native';

import { useTheme } from '@emotion/react';

import { GoBackIcon, Text } from 'src/components';

import * as S from './styled';

export interface ScreenHeaderCustomProps {
  title: string;
  rightContent?: React.ReactNode;
  isLoading?: boolean;
  isItemBlack?: string;
}

export type ScreenHeaderProps = ScreenHeaderCustomProps & ViewProps;

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightContent,
  isLoading,
  isItemBlack,
  ...props
}) => {
  const theme = useTheme();
  return (
    <S.ScreenHeaderContainer {...props}>
      <GoBackIcon isLoading={isLoading} iconColor={isItemBlack ? theme.black : theme.default} />
      <Text size={16} color={isItemBlack ? theme.black : theme.default}>
        {title}
      </Text>
      {!rightContent ? <View style={{ flexGrow: 0.1 }} /> : rightContent}
    </S.ScreenHeaderContainer>
  );
};
