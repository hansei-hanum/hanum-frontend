import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { useNavigate, usePressingAnimation } from 'src/hooks';
import { Icon, Text } from 'src/components';
import { ShowMoreSectionItem } from 'src/constants/showMore';

import * as S from './styled';

export interface SectionItemProps extends ShowMoreSectionItem {}

export const ShowMoreCard: React.FC<SectionItemProps> = ({ name, icon, navigateUrl }) => {
  const theme = useTheme();

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
      <S.ShowMoreCardWrapper style={[bgColorAnimatedStyle]}>
        <S.ShowMoreCardContainer style={[scaleAnimatedStyle]}>
          <S.ShowMoreCardIconContainer>
            <Icon icon={icon} />
            <Text key={name} size={16}>
              {name}
            </Text>
          </S.ShowMoreCardIconContainer>
          <MaterialIcons name="chevron-right" size={30} color={theme.placeholder} />
        </S.ShowMoreCardContainer>
      </S.ShowMoreCardWrapper>
    </TouchableOpacity>
  );
};
