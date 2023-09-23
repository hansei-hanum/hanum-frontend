import React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';

import { Text } from 'src/components';
import { colors } from 'src/styles';
import { boxShadow } from 'src/constants';
import { useNavigate, usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface AlertBoxProps {
  icon: ImageSourcePropType;
  subText: string;
  mainText: string;
  navigateUrl: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
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
            <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={icon} />
            <S.AlertBoxTextContainer>
              <Text size={13} fontFamily="medium" color={colors.placeholder}>
                {subText}
              </Text>
              <Text size={15} fontFamily="bold">
                {mainText}
              </Text>
            </S.AlertBoxTextContainer>
          </S.AlertBoxContentContainer>
          <MaterialIcons name="chevron-right" size={size} color={colors.placeholder} />
        </S.AlertBoxContainer>
      </S.AlertBoxWrapper>
    </TouchableOpacity>
  );
};
