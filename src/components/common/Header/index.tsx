/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { GoBackIcon } from '../GoBackHeader';
import { Text } from '../Text';
import { Icon } from '../Icon';

import * as S from './styled';

export interface HeaderProps {
  children?: React.ReactNode;
  hasGoBackIcon?: boolean;
  hasIconContainer?: {
    icon: any;
    text: string;
  };
  isRow?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  isRow,
  style,
  hasGoBackIcon,
  hasIconContainer,
}) => {
  return (
    <S.HeaderContainer
      style={[
        {
          flexDirection: isRow ? 'row' : 'column',
          alignItems: isRow ? 'center' : 'flex-start',
          justifyContent: isRow ? 'space-between' : 'flex-start',
        },
        style,
      ]}
    >
      {hasGoBackIcon && <GoBackIcon />}
      {hasIconContainer && (
        <S.HeaderIconContainer>
          <Icon includeBackground={false} icon={hasIconContainer.icon} size={30} />
          <Text size={20} fontFamily="bold">
            {hasIconContainer.text}
          </Text>
        </S.HeaderIconContainer>
      )}
      {children}
    </S.HeaderContainer>
  );
};
