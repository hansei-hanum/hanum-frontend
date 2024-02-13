import React from 'react';
import MI from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, Text } from 'src/components/common';

import * as S from './styled';

export interface ReplyBoxProps {
  userId: string;
  closeReplyBox: () => void;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ userId, closeReplyBox }) => {
  const theme = useTheme();
  return (
    <S.ReplyBoxContainer>
      <Text size={14} color={theme.placeholder}>
        {userId}님에게 답글 남기는 중
      </Text>
      <ScaleOpacity onPress={closeReplyBox}>
        <MI name="cancel" size={24} color={theme.placeholder} />
      </ScaleOpacity>
    </S.ReplyBoxContainer>
  );
};
