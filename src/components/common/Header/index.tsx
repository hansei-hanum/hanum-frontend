import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

export interface CommonHeaderProps {
  isLoading?: boolean;
  size?: number;
  style?: StyleProp<TextStyle>;
  isWhite?: boolean;
}

export const CommonHeader: React.FC<CommonHeaderProps> = ({
  isLoading,
  size = 28,
  style,
  isWhite,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={isLoading ? 1 : 0.5}
      style={style}
      onPress={() => {
        if (isLoading) return;
        navigation.goBack();
      }}
    >
      <Entypo name="chevron-thin-left" size={size} color={isWhite ? theme.white : theme.default} />
    </TouchableOpacity>
  );
};
