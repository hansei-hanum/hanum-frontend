/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ContentBox, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface AlertBoxProps {
  icon: ImageSourcePropType;
  subText: string;
  mainText: string;
  navigateUrl: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
  const navigate = useNavigation().navigate as (screen: string) => void;
  return (
    <ContentBox>
      <S.AlertBoxContainer>
        <S.AlertBoxContentContainer>
          <WithLocalSvg width={30} height={30} asset={icon} />
          <S.AlertBoxTextContainer>
            <Text size="13" fontFamily="bold" color={colors.placeholder}>
              {subText}
            </Text>
            <Text size="17" fontFamily="bold">
              {mainText}
            </Text>
          </S.AlertBoxTextContainer>
        </S.AlertBoxContentContainer>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigate(navigateUrl)}>
          <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
        </TouchableOpacity>
      </S.AlertBoxContainer>
    </ContentBox>
  );
};
