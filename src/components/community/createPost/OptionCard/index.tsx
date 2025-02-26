import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { useTheme } from '@emotion/react';

import { Icon, ScaleOpacity, Text } from 'src/components';
import { PostOptionEnum, PostOptionItems } from 'src/constants';

import * as S from './styled';

export interface OptionCardProps extends PostOptionItems {
  index: number;
  onOptionClick: (option: PostOptionEnum) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ icon, text, index, onOptionClick }) => {
  const theme = useTheme();

  return (
    <ScaleOpacity key={index} onPress={() => onOptionClick(text)} style={{ width: '100%' }}>
      <S.OptionCardContainer>
        <S.OptionCardIconContainer>
          <Icon icon={icon} includeBackground={false} />
          <Text size={15}>{text}</Text>
        </S.OptionCardIconContainer>
        <Entypo name="chevron-thin-right" size={20} color={theme.placeholder} />
      </S.OptionCardContainer>
    </ScaleOpacity>
  );
};
