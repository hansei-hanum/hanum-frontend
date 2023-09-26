import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { colors } from 'src/styles';
import { Text } from 'src/components';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface EoullimVoteProps {
  onPress: () => void;
  isSelect?: boolean | null;
  name: string;
}

export const EoullimVoteComponent: React.FC<EoullimVoteProps> = ({ name, isSelect, onPress }) => {
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
        <Text size={15} fontFamily="bold" color={isSelect ? colors.primary : colors.placeholder}>
          {name}
        </Text>
        <Ionicons name="checkmark-circle" size={34} color={isSelect ? colors.primary : '#E8E8E8'} />
      </S.EoullimVote>
    </TouchableOpacity>
  );
};
