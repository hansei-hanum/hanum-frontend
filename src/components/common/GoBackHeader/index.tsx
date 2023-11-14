import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

export interface GoBackHeaderProps {
  isLoading?: boolean;
  size?: number;
  isWhite?: boolean;
}

export const GoBackHeader: React.FC<GoBackHeaderProps> = ({ isLoading, size = 28, isWhite }) => {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={isLoading ? 1 : 0.5}
      onPress={() => {
        if (isLoading) return;
        navigation.goBack();
      }}
    >
      <Entypo name="chevron-thin-left" size={size} color={isWhite ? theme.white : theme.default} />
    </TouchableOpacity>
  );
};
