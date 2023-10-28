import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigate, usePressingAnimation } from 'src/hooks';
import { Icon, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface SectionItemProps {
  name: string;
  icon: string;
  navigateUrl: string;
}

export const SectionItem: React.FC<SectionItemProps> = ({ name, icon, navigateUrl }) => {
  const navigate = useNavigate();
  const { handlePressIn, handlePressOut, bgColorAnimatedStyle, scaleAnimatedStyle } =
    usePressingAnimation();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigate(navigateUrl)}
    >
      <S.SectionItemWrapper style={[bgColorAnimatedStyle]}>
        <S.SectionItem style={[scaleAnimatedStyle]}>
          <S.SectionIconContainer>
            <Icon icon={icon} />
            <Text key={name} size={16}>
              {name}
            </Text>
          </S.SectionIconContainer>
          <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
        </S.SectionItem>
      </S.SectionItemWrapper>
    </TouchableOpacity>
  );
};
