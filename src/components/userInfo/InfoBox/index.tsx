import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components/common';
import { useNavigate } from 'src/hooks';
import { UserInfoItem } from 'src/constants';

import * as S from './styled';

export const InfoBox: React.FC<UserInfoItem> = ({ title, fields }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <S.InfoBoxContainer key={title}>
      <Text size={20} fontFamily="bold">
        {title}
      </Text>
      {fields.map((field) => (
        <S.InfoBoxItem key={field.title}>
          <Text size={15} fontFamily="medium" color={theme.placeholder}>
            {field.title}
          </Text>
          {typeof field.value === 'string' ? (
            <Text size={15} fontFamily="medium">
              {field.value}
            </Text>
          ) : (
            <TouchableOpacity activeOpacity={0.4} onPress={() => navigate('Verify')}>
              <Text size={15} fontFamily="medium" color={theme.primary}>
                인증 필요
                <Entypo
                  name="chevron-thin-right"
                  size={16}
                  color={theme.primary}
                  style={{ marginBottom: 10 }}
                />
              </Text>
            </TouchableOpacity>
          )}
        </S.InfoBoxItem>
      ))}
    </S.InfoBoxContainer>
  );
};
