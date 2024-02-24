import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { ContentBox, Text, Icon } from 'src/components';
import { useNavigate, usePressingAnimation } from 'src/hooks';
import { isIos } from 'src/utils';
import { RootStackParamList } from 'src/Router';

import * as S from './styled';

export interface ContentProps {
  icon: string;
  name: string;
  children?: React.ReactNode;
  navigateUrl?: keyof RootStackParamList;
  onPress?: () => void;
}

export const Content: React.FC<ContentProps> = ({ icon, name, children, navigateUrl, onPress }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const size = 30;

  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation(theme.modalBg);

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
              <Icon icon={icon} includeBackground={false} />
              <Text size={isIos ? 15 : 14} fontFamily="bold">
                {name}
              </Text>
            </S.ContentIconContainer>
            {navigateUrl || onPress ? (
              <MaterialIcons name="chevron-right" size={size} color={theme.placeholder} />
            ) : null}
          </S.ContentTopSection>
        </S.ContentTopSectionWrapper>
      </TouchableOpacity>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </ContentBox>
  );
};
