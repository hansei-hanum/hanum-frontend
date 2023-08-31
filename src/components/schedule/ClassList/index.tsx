import React from 'react';
import { FlatList } from 'react-native';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface ClassListProps {
  list: string[];
  isToday?: boolean;
  isNumber?: boolean;
}

export const ClassList: React.FC<ClassListProps> = ({ list, isToday, isNumber }) => {
  return (
    <FlatList
      style={{
        backgroundColor: isToday ? 'rgba(69, 133, 254, 0.10)' : colors.white,
        paddingTop: 32,
      }}
      data={list}
      renderItem={({ item }) => (
        <S.ClassListWrapper key={item}>
          <Text
            size={15}
            fontFamily="medium"
            color={isToday || isNumber ? colors.black : colors.placeholder}
            isCenter
          >
            {item}
          </Text>
        </S.ClassListWrapper>
      )}
      keyExtractor={(item) => item}
      scrollEnabled={false}
    />
  );
};
