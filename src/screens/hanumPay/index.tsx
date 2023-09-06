import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import { Button, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HanumPayScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <S.HanumPayWrapper>
      <S.HanumPayContainer>
        <S.HanumPayHeader>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', left: 0, top: 0 }}
          >
            <Entypo name="chevron-thin-left" size={24} />
          </TouchableOpacity>
          <Text size={18}>한움페이</Text>
        </S.HanumPayHeader>
        <S.HanumPaySection>
          <Text.Column>
            <Text size={14} color={colors.placeholder}>
              한움페이 잔액
            </Text>
            <Text size={32} fontFamily="bold">
              9,000원
            </Text>
          </Text.Column>
          <Button>결제하기</Button>
          <S.HanumUsageHistory>
            <Text size={20}>이용내역</Text>
            <S.HanumUsageDetails>
              <Text.Column>
                <Text size={18}>충전</Text>
                <Text size={16} color={colors.placeholder}>
                  학생회 환전소
                </Text>
              </Text.Column>
              <Text size={20} color={colors.black}>
                10,000원
              </Text>
            </S.HanumUsageDetails>
          </S.HanumUsageHistory>
        </S.HanumPaySection>
      </S.HanumPayContainer>
    </S.HanumPayWrapper>
  );
};
