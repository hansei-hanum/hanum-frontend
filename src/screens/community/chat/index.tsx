import React from 'react';

import { GoBackIcon, Header, Text } from 'src/components';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  return (
    <S.CommunityChatWrapper>
      <Header>
        <GoBackIcon />
      </Header>
      <S.CommunityChatContainer>
        <Text size={20} fontFamily="bold">
          CommunityChatScreen
        </Text>
      </S.CommunityChatContainer>
    </S.CommunityChatWrapper>
  );
};
