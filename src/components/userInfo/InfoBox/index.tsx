import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

import { Text } from 'src/components/common';
import { colors } from 'src/styles';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface InfoBoxProps {
  number: string;
  isVerify?: string;
  endDate: string | null;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ number, isVerify, endDate }) => {
  const navigate = useNavigate();
  const sections = [
    {
      title: '기본 정보',
      fields: [
        {
          title: '전화번호',
          value: number,
        },
      ],
    },
    {
      title: '인증 정보',
      fields: [
        {
          title: '분류',
          value:
            isVerify !== '' ? (
              isVerify
            ) : (
              <TouchableOpacity activeOpacity={0.4} onPress={() => navigate('Verify')}>
                <Text size={15} fontFamily="medium" color={colors.primary}>
                  인증 필요
                  <Entypo
                    name="chevron-thin-right"
                    size={16}
                    color={colors.primary}
                    style={{ marginBottom: 10 }}
                  />
                </Text>
              </TouchableOpacity>
            ),
        },
        {
          title: '유효기간',
          value: endDate ? endDate : '없음',
        },
      ],
    },
  ];
  return (
    <S.InfoBoxContainer>
      {sections.map((section) => (
        <S.InfoBoxContainer key={section.title}>
          <Text size={20} fontFamily="bold">
            {section.title}
          </Text>
          {section.fields.map((field) => (
            <S.InfoBoxItem key={field.title}>
              <Text size={15} fontFamily="medium" color={colors.placeholder}>
                {field.title}
              </Text>
              {typeof field.value === 'string' ? (
                <Text size={15} fontFamily="medium">
                  {field.value}
                </Text>
              ) : (
                field.value
              )}
            </S.InfoBoxItem>
          ))}
        </S.InfoBoxContainer>
      ))}
    </S.InfoBoxContainer>
  );
};
