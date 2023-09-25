import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { colors } from 'src/styles';

export interface EoullimHeaderProps {
  isMain?: boolean;
}

export const EoullimHeader: React.FC<EoullimHeaderProps> = ({ isMain }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
      <Fontisto name="angle-left" size={24} color={isMain ? colors.white : colors.black} />
    </TouchableOpacity>
  );
};
