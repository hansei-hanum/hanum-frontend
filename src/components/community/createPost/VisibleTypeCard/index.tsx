import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { Icon, ScaleOpacity, Text } from 'src/components/common';
import { VisibleTypeItems } from 'src/constants';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

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
  const formatVisibleType = (type: VisibleTypeItems['text']) => {
    switch (type) {
      case LimitedArticleScopeOfDisclosure.Public:
        return '전체 공개';
      case LimitedArticleScopeOfDisclosure.Faculty:
        return '교직원 공개';
      case LimitedArticleScopeOfDisclosure.Alumni:
        return '제한 공개';
      case LimitedArticleScopeOfDisclosure.Student:
        return '졸업생 공개';
      case LimitedArticleScopeOfDisclosure.Peer:
        return '학생 공개';
      case LimitedArticleScopeOfDisclosure.Peer:
        return '동급생 공개';
      default:
        return '';
    }
  };

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
