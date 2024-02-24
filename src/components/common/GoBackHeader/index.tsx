import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

export interface GoBackCustomIconProps {
  isLoading?: boolean;
  size?: number;
  isWhite?: boolean;
  onPress?: () => void;
}

export const GoBackIcon: React.FC<GoBackCustomIconProps> = ({
  isLoading,
  size = 25,
  isWhite,
  onPress,
}) => {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={isLoading ? 1 : 0.5}
      onPress={() => {
        if (isLoading) return;
        onPress && onPress();
        navigation.goBack();
      }}
    >
      <Entypo name="chevron-thin-left" size={size} color={isWhite ? theme.white : theme.default} />
    </TouchableOpacity>
  );
};
