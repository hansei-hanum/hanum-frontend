import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from 'src/components/common';
import { USER_INFO_LIST } from 'src/constants';
import { colors } from 'src/styles';

import * as S from './styled';

export interface InfoBoxProps {
  number: string;
  isVerify: boolean;
  endDate: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ number, isVerify, endDate }) => {
  return (
    <S.InfoBoxContainer>
      <S.InfoBoxContainer>
        <Text size={20} fontFamily="bold">
          기본정보
        </Text>
        <S.InfoBoxItem>
          <Text size={15} fontFamily="medium" color={colors.placeholder}>
            전화번호
          </Text>
          <Text size={15} fontFamily="medium">
            {number}
          </Text>
        </S.InfoBoxItem>
      </S.InfoBoxContainer>
      <S.InfoBoxContainer>
        <Text size={20} fontFamily="bold">
          인증 정보
        </Text>
        <S.InfoBoxItem>
          <Text size={15} fontFamily="medium" color={colors.placeholder}>
            분류
          </Text>
          {isVerify ? (
            <TouchableOpacity activeOpacity={0.2}>
              <Text size={15} fontFamily="medium" color={colors.primary}>
                인증 필요
              </Text>
            </TouchableOpacity>
          ) : (
            <Text size={15} fontFamily="medium">
              재학생
            </Text>
          )}
        </S.InfoBoxItem>
        <S.InfoBoxItem>
          <Text size={15} fontFamily="medium" color={colors.placeholder}>
            유효기간
          </Text>
          <Text size={15} fontFamily="medium">
            {endDate}
          </Text>
        </S.InfoBoxItem>
      </S.InfoBoxContainer>
    </S.InfoBoxContainer>
  );
};
