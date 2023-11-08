import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface EoullimVoteBoxProps {
  onPress: () => void;
  isSelect?: boolean | null;
  name: string;
}

export const EoullimVoteBox: React.FC<EoullimVoteBoxProps> = ({ name, isSelect, onPress }) => {
  const theme = useTheme();
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();
  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.6}
      style={{ ...scaleAnimatedStyle, width: '100%' }}
    >
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
    </TouchableOpacity>
  );
};
