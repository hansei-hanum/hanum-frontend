import React from 'react';
import { FlatList } from 'react-native';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components';
import { RPH } from 'src/utils';

import * as S from './styled';

export interface ClassListProps {
  list: string[];
  isToday?: boolean;
  isNumber?: boolean;
}

export const ClassList: React.FC<ClassListProps> = ({ list, isToday, isNumber }) => {
  const theme = useTheme();
  return (
    <FlatList
      style={{
        backgroundColor: isToday ? 'rgba(69, 133, 254, 0.10)' : 'transparent',
        paddingTop: 20,
        width: 40,
        height: RPH(67),
      }}
      data={list}
      renderItem={({ item, index }) => {
        const formatName = (name: string) => {
          if (
            name.includes('*') ||
            name.includes('활용') ||
            name.includes('Ⅰ') ||
            name.includes('LAN') ||
            name.includes('인공지능') ||
            name.includes('빅데이터 분석') ||
            name.includes('애플리케이션 보안') ||
            name.includes('클라우드 시스템')
          ) {
            return name
              .replace('*', '')
              .replace('활용', '')
              .replace('Ⅰ', '')
              .replace('근거리통신망(LAN) 설계', '네트워크 구축')
              .replace('과 미래사회', '')
              .replace('결과 시각화', '')
              .replace('애플리케이션 보안 운영', '클라우드 보안')
              .replace('클라우드 시스템 요구사항 분석', '클라우드 구축');
          }
          return name;
        };

        return (
          <S.ClassListWrapper key={Math.random() * index}>
            <Text
              size={item.length > 5 ? 14 : 15}
              color={isToday || isNumber ? theme.default : theme.placeholder}
              isCenter
            >
              {formatName(item)}
            </Text>
          </S.ClassListWrapper>
        );
      }}
      keyExtractor={(item) => Math.random() + item}
      scrollEnabled={false}
    />
  );
};
