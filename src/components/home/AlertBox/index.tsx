import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { Icon, Text } from 'src/components';
import { boxShadow } from 'src/constants';
import { useNavigate, usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface AlertBoxProps {
  icon: string;
  subText: string;
  mainText: string;
  navigateUrl: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const size = 30;

  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigate(navigateUrl)}
    >
      <S.AlertBoxWrapper style={[animatedStyle, boxShadow]}>
        <S.AlertBoxContainer>
          <S.AlertBoxContentContainer>
            <Icon icon={icon} includeBackground={false} />
            <S.AlertBoxTextContainer>
              <Text size={13} fontFamily="medium" color={theme.placeholder}>
                {subText}
              </Text>
              <Text size={15} fontFamily="bold">
                {mainText}
              </Text>
            </S.AlertBoxTextContainer>
          </S.AlertBoxContentContainer>
          <MaterialIcons name="chevron-right" size={size} color={theme.placeholder} />
        </S.AlertBoxContainer>
      </S.AlertBoxWrapper>
    </TouchableOpacity>
  );
};
