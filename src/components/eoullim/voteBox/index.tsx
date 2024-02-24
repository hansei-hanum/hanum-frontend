import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, Text } from 'src/components';

import * as S from './styled';

export interface EoullimVoteBoxProps {
  onPress: () => void;
  isSelect?: boolean | null;
  name: string;
}

export const EoullimVoteBox: React.FC<EoullimVoteBoxProps> = ({ name, isSelect, onPress }) => {
  const theme = useTheme();

  return (
    <ScaleOpacity onPress={onPress} style={{ width: '100%' }}>
      <S.EoullimVote style={{ borderColor: isSelect ? theme.primary : theme.lightGray }}>
        <S.EoullimVoteTextWrapper>
          <Text size={15} fontFamily="bold" color={isSelect ? theme.primary : theme.placeholder}>
            {name}
          </Text>
        </S.EoullimVoteTextWrapper>
        <S.EoullimVoteButtonWrapper>
          <Ionicons
            name="checkmark-circle"
            size={34}
            color={isSelect ? theme.primary : theme.vote.notSelect}
          />
        </S.EoullimVoteButtonWrapper>
      </S.EoullimVote>
    </ScaleOpacity>
  );
};
