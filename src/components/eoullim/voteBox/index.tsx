import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { colors } from 'src/styles';
import { Text } from 'src/components';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface EoullimVoteBoxProps {
  onPress: () => void;
  isSelect?: boolean | null;
  name: string;
}

export const EoullimVoteBox: React.FC<EoullimVoteBoxProps> = ({ name, isSelect, onPress }) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();
  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.6}
      style={{ ...scaleAnimatedStyle, width: '100%' }}
    >
      <S.EoullimVote style={{ borderColor: isSelect ? colors.primary : colors.lightGray }}>
        <S.EoullimVoteTextWrapper>
          <Text size={15} fontFamily="bold" color={isSelect ? colors.primary : colors.placeholder}>
            {name}
          </Text>
        </S.EoullimVoteTextWrapper>
        <S.EoullimVoteButtonWrapper>
          <Ionicons
            name="checkmark-circle"
            size={34}
            color={isSelect ? colors.primary : colors.vote.notSelect}
          />
        </S.EoullimVoteButtonWrapper>
      </S.EoullimVote>
    </TouchableOpacity>
  );
};
