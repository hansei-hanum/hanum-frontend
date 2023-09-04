import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const UserInfoScreen: React.FC = () => {
  return (
    <S.UserInfoContainer>
      <Text size={16}>User info screen</Text>
    </S.UserInfoContainer>
  );
};
