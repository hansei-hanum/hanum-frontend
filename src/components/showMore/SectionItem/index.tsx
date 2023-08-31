import React from 'react';
import { TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigate, usePressingAnimation } from 'src/hooks';
import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface SectionItemProps {
  name: string;
  icon: string;
  navigateUrl: string;
}

export const SectionItem: React.FC<SectionItemProps> = ({ name, icon, navigateUrl }) => {
  const navigate = useNavigate();
  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigate(navigateUrl)}
    >
      <S.SectionItem style={[animatedStyle]}>
        <S.SectionIconContainer>
          <S.SectionIconWrapper>
            <Text key={name} size={30} fontFamily="tossIcon">
              {icon}
            </Text>
          </S.SectionIconWrapper>
          <Text key={name} size={16}>
            {name}
          </Text>
        </S.SectionIconContainer>
        <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
      </S.SectionItem>
    </TouchableOpacity>
  );
};
