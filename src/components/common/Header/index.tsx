/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Image, StyleProp, ViewStyle } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import { GoBackIcon } from '../GoBackHeader';
import { Text } from '../Text';

import * as S from './styled';
import { Icon } from '../Icon';

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
          {/* <WithLocalSvg width={32} height={32} asset={hasIconContainer.icon} /> */}
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
