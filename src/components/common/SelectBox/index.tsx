import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, Text } from 'src/components';

import * as S from './styled';

export interface SelectBoxProps {
  onPress: () => void;
  isSelect?: boolean | null;
  name: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({ name, isSelect, onPress }) => {
  const theme = useTheme();

  return (
    <ScaleOpacity onPress={onPress} style={{ width: '100%' }}>
      <S.SelectBox style={{ borderColor: isSelect ? theme.primary : theme.lightGray }}>
        <S.SelectBoxTextWrapper>
          <Text size={15} fontFamily="bold" color={isSelect ? theme.primary : theme.placeholder}>
            {name}
          </Text>
        </S.SelectBoxTextWrapper>
        <S.SelectBoxIconWrapper>
          <Ionicons
            name="checkmark-circle"
            size={34}
            color={isSelect ? theme.primary : theme.vote.notSelect}
          />
        </S.SelectBoxIconWrapper>
      </S.SelectBox>
    </ScaleOpacity>
  );
};
