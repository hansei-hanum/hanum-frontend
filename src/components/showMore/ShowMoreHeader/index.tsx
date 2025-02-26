import React from 'react';

import { Header, Text } from 'src/components/common';

export const ShowMoreHeader: React.FC = () => {
  return (
    <Header isRow>
      <Text size={20} fontFamily="bold">
        더 보기
      </Text>
    </Header>
  );
};
