import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { Icon, ScaleOpacity, Text } from 'src/components/common';
import { VisibleTypeItems } from 'src/constants';
import { formatVisibleType } from 'src/utils';

import * as S from './styled';

export interface VisibleTypeCardProps extends VisibleTypeItems {
  onOptionClick: (index: number) => void;
  isActive: boolean;
  index: number;
}

export const VisibleTypeCard: React.FC<VisibleTypeCardProps> = ({
  onOptionClick,
  isActive,
  text,
  icon,
  index,
}) => {
  const theme = useTheme();

  return (
    <ScaleOpacity onPress={() => onOptionClick(index)}>
      <S.VisibleTypeCardContainer>
        <S.VisibleTypeCardIconContainer>
          <Icon icon={icon} size={34} includeBackground={false} />
          <Text size={18}>{formatVisibleType(text)}</Text>
        </S.VisibleTypeCardIconContainer>
        <MCI
          name={isActive ? 'circle-slice-8' : 'circle-outline'}
          size={30}
          color={isActive ? theme.primary : theme.placeholder}
        />
      </S.VisibleTypeCardContainer>
    </ScaleOpacity>
  );
};
