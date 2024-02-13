import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { Icon, ScaleOpacity, Text } from 'src/components/common';
import { VisibleTypeItems } from 'src/constants';
import { VisibleActiveOptionType } from 'src/screens';

import * as S from './styled';

export interface VisibleTypeCardProps extends VisibleTypeItems {
  onOptionClick: (index: number) => void;
  activeOption: VisibleActiveOptionType;
  index: number;
}

export const VisibleTypeCard: React.FC<VisibleTypeCardProps> = ({
  onOptionClick,
  activeOption,
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
          <Text size={18}>{text}</Text>
        </S.VisibleTypeCardIconContainer>
        <MCI
          name={activeOption[text] ? 'circle-slice-8' : 'circle-outline'}
          size={30}
          color={activeOption[text] ? theme.primary : theme.placeholder}
        />
      </S.VisibleTypeCardContainer>
    </ScaleOpacity>
  );
};
