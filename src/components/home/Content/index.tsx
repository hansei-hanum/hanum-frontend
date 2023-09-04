import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ContentBox, Text } from 'src/components';
import { colors } from 'src/styles';
import { useNavigate, usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface ContentProps {
  icon: string;
  name: string;
  children?: React.ReactNode;
  navigateUrl?: string;
  onPress?: () => void;
}

export const Content: React.FC<ContentProps> = ({ icon, name, children, navigateUrl, onPress }) => {
  const navigate = useNavigate();
  const size = 30;

  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  return (
    <ContentBox isHome>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        onPress={navigateUrl ? () => navigate(navigateUrl) : onPress}
      >
        <S.ContentTopSectionWrapper style={navigateUrl || onPress ? animatedStyle : null}>
          <S.ContentTopSection>
            <S.ContentIconContainer>
              <Text size={30} fontFamily="tossIcon">
                {icon}
              </Text>
              <Text size={Platform.OS === 'ios' ? 15 : 14} fontFamily="bold">
                {name}
              </Text>
            </S.ContentIconContainer>
            {navigateUrl || onPress ? (
              <MaterialIcons name="chevron-right" size={size} color={colors.placeholder} />
            ) : null}
          </S.ContentTopSection>
        </S.ContentTopSectionWrapper>
      </TouchableOpacity>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </ContentBox>
  );
};
