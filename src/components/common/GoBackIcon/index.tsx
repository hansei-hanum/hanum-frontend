import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export interface GoBackIconProps {
  size?: number;
  style?: StyleProp<TextStyle>;
}

export const GoBackIcon: React.FC<GoBackIconProps> = ({ size = 26, style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()} style={style}>
      <Entypo name="chevron-thin-left" size={size} color="black" />
    </TouchableOpacity>
  );
};
