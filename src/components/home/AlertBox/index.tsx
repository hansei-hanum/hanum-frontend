import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'src/components';
import { colors } from 'src/styles';
import { boxShadow } from 'src/constants';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface AlertBoxProps {
  icon: ImageSourcePropType;
  subText: string;
  mainText: string;
  navigateUrl: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
  const navigate = useNavigation().navigate as (screen: string) => void;
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
            <WithLocalSvg width={size} height={size} asset={icon} />
            <S.AlertBoxTextContainer>
              <Text size="15" fontFamily="bold" color={colors.placeholder}>
                {subText}
              </Text>
              <Text size="17" fontFamily="bold">
                {mainText}
              </Text>
            </S.AlertBoxTextContainer>
          </S.AlertBoxContentContainer>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigate(navigateUrl)}>
            <MaterialIcons name="chevron-right" size={size} color={colors.placeholder} />
          </TouchableOpacity>
        </S.AlertBoxContainer>
      </S.AlertBoxWrapper>
    </TouchableOpacity>
  );
};
