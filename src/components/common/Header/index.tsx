import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import { colors } from 'src/styles';
import { loadingAtom } from 'src/atoms/loading';

export interface CommonHeaderProps {
  size?: number;
  style?: StyleProp<TextStyle>;
  isWhite?: boolean;
}

export const CommonHeader: React.FC<CommonHeaderProps> = ({ size = 28, style, isWhite }) => {
  const loading = useRecoilValue(loadingAtom);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={loading ? 1 : 0.5}
      style={style}
      onPress={() => {
        if (loading) return;
        navigation.goBack();
      }}
    >
      <Entypo name="chevron-thin-left" size={size} color={isWhite ? colors.white : colors.black} />
    </TouchableOpacity>
  );
};
